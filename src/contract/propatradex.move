#[allow(unused_variable, unused_const, unused_use, duplicate_alias, unused_let_mut)]
module propatradex::propatradex {
    use iota::object::{Self, UID, ID};
    use iota::transfer;
    use iota::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use std::option::{Self, Option};
    use iota::coin::{Self, Coin};
    use iota::balance::{Self, Balance};
    use iota::iota::IOTA;
    use iota::event;
    use iota::clock::{Self, Clock};
    use iota::table::{Self, Table};

    // ==================== Error Codes ====================
    const E_NOT_AUTHORIZED: u64 = 1;
    const E_INVALID_AMOUNT: u64 = 2;
    const E_PROPERTY_NOT_AVAILABLE: u64 = 3;
    const E_ALREADY_CONFIRMED: u64 = 4;
    const E_ALREADY_RESOLVED: u64 = 5;
    const E_NO_DISPUTE: u64 = 6;
    const E_RENTAL_NOT_EXPIRED: u64 = 7;
    const E_INVALID_LISTING_TYPE: u64 = 8;
    const E_ESCROW_NOT_CONFIRMED: u64 = 9;
    const E_DISPUTE_RAISED: u64 = 10;
    const E_PROFILE_NOT_FOUND: u64 = 11;
    const E_NOT_IN_ESCROW: u64 = 12;

    // ==================== Listing Type Constants ====================
    const LISTING_TYPE_SALE: u8 = 1;
    const LISTING_TYPE_RENT: u8 = 2;

    // ==================== Status Constants ====================
    const STATUS_AVAILABLE: u8 = 1;
    const STATUS_IN_ESCROW: u8 = 2;
    const STATUS_COMPLETED: u8 = 3;
    const STATUS_RENTED: u8 = 4;

    // ==================== Structs ====================

    /// Platform Admin Capability - Only for dispute resolution
    public struct AdminCap has key, store {
        id: UID,
    }

    /// Global Registry to store user profiles
    public struct ProfileRegistry has key {
        id: UID,
        profiles: Table<address, UserProfile>,
    }

    /// User Profile with KYC details (stored in registry)
    public struct UserProfile has store, drop {
        wallet_address: address,
        full_name: String,
        government_id_type: String,
        government_id_number: String,
        phone_number: String,
        email: String,
        created_at: u64,
    }

    /// Unified Property Listing (for both Sale and Rent)
    public struct PropertyListing has key, store {
        id: UID,
        owner: address,
        listing_type: u8, // 1 = Sale, 2 = Rent
        
        // Pricing
        price: u64, // Sale price OR total rental amount (monthly_rent * months + deposit)
        monthly_rent: Option<u64>, // Only for rent
        rental_period_months: Option<u64>, // Only for rent
        deposit_required: Option<u64>, // Only for rent
        
        // Property Details
        property_address: String,
        property_type: String,
        description: String,
        
        // Media (IPFS Content IDs)
        documents_cid: Option<String>, // Only for sale
        images_cids: vector<String>,
        video_cid: String,
        
        // Status
        status: u8,
        locked_by: Option<address>,
        escrow_id: Option<ID>,
        created_at: u64,
        
        // Rental specific
        rental_start_date: Option<u64>,
        rental_end_date: Option<u64>,
    }

    /// Escrow for both Buy and Rent transactions
    public struct Escrow has key, store {
        id: UID,
        listing_type: u8,
        property_id: ID,
        
        // Parties
        buyer_renter: address,
        seller_landlord: address,
        
        // Payment
        funds: Balance<IOTA>,
        amount: u64,
        
        // Confirmations
        buyer_renter_confirmed: bool,
        seller_landlord_confirmed: bool,
        
        // Dispute
        dispute_raised: bool,
        dispute_raised_by: Option<address>,
        dispute_reason: String,
        
        // Receipt NFTs
        buyer_renter_receipt_id: Option<ID>,
        seller_landlord_receipt_id: Option<ID>,
        
        // Status
        resolved: bool,
        created_at: u64,
    }

    /// Property Receipt NFT
    public struct PropertyReceipt has key, store {
        id: UID,
        listing_type: u8,
        timestamp: u64,
        
        // Property Info
        property_id: ID,
        property_address: String,
        property_type: String,
        
        // Parties
        buyer_renter_address: address,
        seller_landlord_address: address,
        
        // Payment
        amount_paid: u64,
        
        // For Rent Only
        rental_start_date: Option<u64>,
        rental_end_date: Option<u64>,
        rental_period_months: Option<u64>,
        monthly_rent: Option<u64>,
        
        // Metadata
        metadata_uri: String,
    }

    // ==================== Events ====================

    public struct UserRegistered has copy, drop {
        user_address: address,
        full_name: String,
        government_id_type: String,
        phone_number: String,
        email: String,
        timestamp: u64,
    }

    public struct PropertyListed has copy, drop {
        property_id: ID,
        owner: address,
        listing_type: u8,
        price: u64,
        property_address: String,
        timestamp: u64,
    }

    public struct EscrowCreated has copy, drop {
        escrow_id: ID,
        property_id: ID,
        listing_type: u8,
        buyer_renter: address,
        seller_landlord: address,
        amount: u64,
        timestamp: u64,
    }

    public struct PartyConfirmed has copy, drop {
        escrow_id: ID,
        confirmer: address,
        is_buyer_renter: bool,
        timestamp: u64,
    }

    public struct FundsReleased has copy, drop {
        escrow_id: ID,
        property_id: ID,
        receiver: address,
        amount: u64,
        timestamp: u64,
    }

    public struct DisputeRaised has copy, drop {
        escrow_id: ID,
        raised_by: address,
        reason: String,
        timestamp: u64,
    }

    public struct DisputeResolved has copy, drop {
        escrow_id: ID,
        winner: address,
        amount: u64,
        receipts_deleted: bool,
        timestamp: u64,
    }

    public struct ReceiptMinted has copy, drop {
        receipt_id: ID,
        recipient: address,
        listing_type: u8,
        amount: u64,
        timestamp: u64,
    }

    public struct RentalExpired has copy, drop {
        property_id: ID,
        renter: address,
        landlord: address,
        timestamp: u64,
    }

    // ==================== Init Function ====================

    fun init(ctx: &mut TxContext) {
        let admin_cap = AdminCap {
            id: object::new(ctx),
        };
        
        let registry = ProfileRegistry {
            id: object::new(ctx),
            profiles: table::new(ctx),
        };
        
        transfer::transfer(admin_cap, tx_context::sender(ctx));
        transfer::share_object(registry);
    }

    // ==================== User Management Functions ====================

    public entry fun register_user(
        registry: &mut ProfileRegistry,
        full_name: vector<u8>,
        government_id_type: vector<u8>,
        government_id_number: vector<u8>,
        phone_number: vector<u8>,
        email: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let user_address = tx_context::sender(ctx);
        
        let profile = UserProfile {
            wallet_address: user_address,
            full_name: string::utf8(full_name),
            government_id_type: string::utf8(government_id_type),
            government_id_number: string::utf8(government_id_number),
            phone_number: string::utf8(phone_number),
            email: string::utf8(email),
            created_at: clock::timestamp_ms(clock),
        };

        event::emit(UserRegistered {
            user_address,
            full_name: profile.full_name,
            government_id_type: profile.government_id_type,
            phone_number: profile.phone_number,
            email: profile.email,
            timestamp: profile.created_at,
        });

        table::add(&mut registry.profiles, user_address, profile);
    }

    // ==================== Property Listing Functions ====================

    public entry fun list_property(
        listing_type: u8,
        price: u64,
        property_address: vector<u8>,
        property_type: vector<u8>,
        description: vector<u8>,
        images_cids: vector<vector<u8>>,
        video_cid: vector<u8>,
        // Optional fields for sale
        documents_cid: Option<vector<u8>>,
        // Optional fields for rent
        monthly_rent: Option<u64>,
        rental_period_months: Option<u64>,
        deposit_required: Option<u64>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(listing_type == LISTING_TYPE_SALE || listing_type == LISTING_TYPE_RENT, E_INVALID_LISTING_TYPE);

        let mut images_vec = vector::empty<String>();
        let len = images_cids.length();
        let mut i = 0;
        while (i < len) {
            images_vec.push_back(string::utf8(images_cids[i]));
            i = i + 1;
        };

        let docs_cid = if (option::is_some(&documents_cid)) {
            option::some(string::utf8(*option::borrow(&documents_cid)))
        } else {
            option::none()
        };

        let mut listing = PropertyListing {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            listing_type,
            price,
            monthly_rent,
            rental_period_months,
            deposit_required,
            property_address: string::utf8(property_address),
            property_type: string::utf8(property_type),
            description: string::utf8(description),
            documents_cid: docs_cid,
            images_cids: images_vec,
            video_cid: string::utf8(video_cid),
            status: STATUS_AVAILABLE,
            locked_by: option::none(),
            escrow_id: option::none(),
            created_at: clock::timestamp_ms(clock),
            rental_start_date: option::none(),
            rental_end_date: option::none(),
        };

        let property_id = object::id(&listing);

        event::emit(PropertyListed {
            property_id,
            owner: listing.owner,
            listing_type,
            price,
            property_address: listing.property_address,
            timestamp: listing.created_at,
        });

        transfer::share_object(listing);
    }

    // ==================== Escrow Functions ====================

    public entry fun deposit_to_escrow(
        property: &mut PropertyListing,
        payment: Coin<IOTA>,
        metadata_uri: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let buyer_renter = tx_context::sender(ctx);
        
        assert!(property.status == STATUS_AVAILABLE, E_PROPERTY_NOT_AVAILABLE);
        assert!(buyer_renter != property.owner, E_NOT_AUTHORIZED);
        
        let amount = coin::value(&payment);
        assert!(amount >= property.price, E_INVALID_AMOUNT);

        property.status = STATUS_IN_ESCROW;
        property.locked_by = option::some(buyer_renter);

        let mut escrow = Escrow {
            id: object::new(ctx),
            listing_type: property.listing_type,
            property_id: object::id(property),
            buyer_renter,
            seller_landlord: property.owner,
            funds: coin::into_balance(payment),
            amount,
            buyer_renter_confirmed: false,
            seller_landlord_confirmed: false,
            dispute_raised: false,
            dispute_raised_by: option::none(),
            dispute_reason: string::utf8(b""),
            buyer_renter_receipt_id: option::none(),
            seller_landlord_receipt_id: option::none(),
            resolved: false,
            created_at: clock::timestamp_ms(clock),
        };

        let escrow_id = object::id(&escrow);
        property.escrow_id = option::some(escrow_id);

        // Create receipts
        let buyer_receipt = create_receipt_nft(
            property.listing_type,
            object::id(property),
            property.property_address,
            property.property_type,
            buyer_renter,
            property.owner,
            amount,
            option::none(),
            option::none(),
            property.rental_period_months,
            property.monthly_rent,
            string::utf8(metadata_uri),
            clock::timestamp_ms(clock),
            ctx
        );

        let seller_receipt = create_receipt_nft(
            property.listing_type,
            object::id(property),
            property.property_address,
            property.property_type,
            buyer_renter,
            property.owner,
            amount,
            option::none(),
            option::none(),
            property.rental_period_months,
            property.monthly_rent,
            string::utf8(metadata_uri),
            clock::timestamp_ms(clock),
            ctx
        );

        escrow.buyer_renter_receipt_id = option::some(object::id(&buyer_receipt));
        escrow.seller_landlord_receipt_id = option::some(object::id(&seller_receipt));

        event::emit(EscrowCreated {
            escrow_id,
            property_id: object::id(property),
            listing_type: property.listing_type,
            buyer_renter,
            seller_landlord: property.owner,
            amount,
            timestamp: clock::timestamp_ms(clock),
        });

        transfer::transfer(buyer_receipt, buyer_renter);
        transfer::transfer(seller_receipt, property.owner);
        
        transfer::share_object(escrow);
    }

    public entry fun buyer_renter_confirms(
        escrow: &mut Escrow,
        property: &mut PropertyListing,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let caller = tx_context::sender(ctx);
        
        assert!(escrow.buyer_renter == caller, E_NOT_AUTHORIZED);
        assert!(!escrow.resolved, E_ALREADY_RESOLVED);
        assert!(!escrow.buyer_renter_confirmed, E_ALREADY_CONFIRMED);
        assert!(!escrow.dispute_raised, E_DISPUTE_RAISED);

        escrow.buyer_renter_confirmed = true;

        event::emit(PartyConfirmed {
            escrow_id: object::id(escrow),
            confirmer: caller,
            is_buyer_renter: true,
            timestamp: clock::timestamp_ms(clock),
        });

        if (escrow.seller_landlord_confirmed) {
            release_funds_no_receipts(escrow, property, clock, ctx);
        };
    }

    public entry fun seller_landlord_confirms(
        escrow: &mut Escrow,
        property: &mut PropertyListing,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let caller = tx_context::sender(ctx);
        
        assert!(escrow.seller_landlord == caller, E_NOT_AUTHORIZED);
        assert!(!escrow.resolved, E_ALREADY_RESOLVED);
        assert!(!escrow.seller_landlord_confirmed, E_ALREADY_CONFIRMED);
        assert!(!escrow.dispute_raised, E_DISPUTE_RAISED);

        escrow.seller_landlord_confirmed = true;

        event::emit(PartyConfirmed {
            escrow_id: object::id(escrow),
            confirmer: caller,
            is_buyer_renter: false,
            timestamp: clock::timestamp_ms(clock),
        });

        if (escrow.buyer_renter_confirmed) {
            release_funds_no_receipts(escrow, property, clock, ctx);
        };
    }

    fun release_funds_no_receipts(
        escrow: &mut Escrow,
        property: &mut PropertyListing,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(!escrow.resolved, E_ALREADY_RESOLVED);
        assert!(escrow.buyer_renter_confirmed && escrow.seller_landlord_confirmed, E_ESCROW_NOT_CONFIRMED);

        let amount = balance::value(&escrow.funds);
        let payment = coin::from_balance(balance::split(&mut escrow.funds, amount), ctx);
        transfer::public_transfer(payment, escrow.seller_landlord);

        let current_time = clock::timestamp_ms(clock);

        // Update property status and rental dates if applicable
        if (escrow.listing_type == LISTING_TYPE_RENT) {
            let seconds_in_month: u64 = 30 * 24 * 60 * 60 * 1000;
            let rental_period = *option::borrow(&property.rental_period_months);
            let rental_duration = rental_period * seconds_in_month;
            
            property.rental_start_date = option::some(current_time);
            property.rental_end_date = option::some(current_time + rental_duration);
            property.status = STATUS_RENTED;
        } else {
            property.status = STATUS_COMPLETED;
        };

        property.locked_by = option::none();
        property.escrow_id = option::none();

        escrow.resolved = true;

        event::emit(FundsReleased {
            escrow_id: object::id(escrow),
            property_id: escrow.property_id,
            receiver: escrow.seller_landlord,
            amount,
            timestamp: current_time,
        });
    }

    // ==================== Rental Expiration ====================

    public entry fun check_rental_expiration(
        property: &mut PropertyListing,
        clock: &Clock,
    ) {
        assert!(property.listing_type == LISTING_TYPE_RENT, E_INVALID_LISTING_TYPE);
        assert!(property.status == STATUS_RENTED, E_NOT_IN_ESCROW);
        
        let end_date = *option::borrow(&property.rental_end_date);
        let current_time = clock::timestamp_ms(clock);
        
        assert!(current_time >= end_date, E_RENTAL_NOT_EXPIRED);

        let renter = *option::borrow(&property.locked_by);
        
        property.status = STATUS_AVAILABLE;
        property.locked_by = option::none();
        property.rental_start_date = option::none();
        property.rental_end_date = option::none();

        event::emit(RentalExpired {
            property_id: object::id(property),
            renter,
            landlord: property.owner,
            timestamp: current_time,
        });
    }

    // ==================== Dispute Functions ====================

    public entry fun raise_dispute(
        escrow: &mut Escrow,
        reason: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let caller = tx_context::sender(ctx);
        
        assert!(caller == escrow.buyer_renter || caller == escrow.seller_landlord, E_NOT_AUTHORIZED);
        assert!(!escrow.resolved, E_ALREADY_RESOLVED);
        assert!(!escrow.dispute_raised, E_ALREADY_CONFIRMED);

        escrow.dispute_raised = true;
        escrow.dispute_raised_by = option::some(caller);
        escrow.dispute_reason = string::utf8(reason);

        event::emit(DisputeRaised {
            escrow_id: object::id(escrow),
            raised_by: caller,
            reason: escrow.dispute_reason,
            timestamp: clock::timestamp_ms(clock),
        });
    }

    public entry fun admin_resolve_dispute_release(
        _admin_cap: &AdminCap,
        escrow: &mut Escrow,
        property: &mut PropertyListing,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(!escrow.resolved, E_ALREADY_RESOLVED);
        assert!(escrow.dispute_raised, E_NO_DISPUTE);

        let amount = balance::value(&escrow.funds);
        let payment = coin::from_balance(balance::split(&mut escrow.funds, amount), ctx);
        transfer::public_transfer(payment, escrow.seller_landlord);

        let current_time = clock::timestamp_ms(clock);

        if (escrow.listing_type == LISTING_TYPE_RENT) {
            let seconds_in_month: u64 = 30 * 24 * 60 * 60 * 1000;
            let rental_period = *option::borrow(&property.rental_period_months);
            let rental_duration = rental_period * seconds_in_month;
            
            property.rental_start_date = option::some(current_time);
            property.rental_end_date = option::some(current_time + rental_duration);
            property.status = STATUS_RENTED;
        } else {
            property.status = STATUS_COMPLETED;
        };

        property.locked_by = option::none();
        property.escrow_id = option::none();

        escrow.resolved = true;

        event::emit(DisputeResolved {
            escrow_id: object::id(escrow),
            winner: escrow.seller_landlord,
            amount,
            receipts_deleted: false,
            timestamp: current_time,
        });
    }

    public entry fun admin_resolve_dispute_refund(
        _admin_cap: &AdminCap,
        escrow: &mut Escrow,
        property: &mut PropertyListing,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(!escrow.resolved, E_ALREADY_RESOLVED);
        assert!(escrow.dispute_raised, E_NO_DISPUTE);

        let amount = balance::value(&escrow.funds);
        let refund = coin::from_balance(balance::split(&mut escrow.funds, amount), ctx);
        transfer::public_transfer(refund, escrow.buyer_renter);

        property.status = STATUS_AVAILABLE;
        property.locked_by = option::none();
        property.escrow_id = option::none();

        escrow.resolved = true;

        event::emit(DisputeResolved {
            escrow_id: object::id(escrow),
            winner: escrow.buyer_renter,
            amount,
            receipts_deleted: false,
            timestamp: clock::timestamp_ms(clock),
        });
    }

    // ==================== Helper Functions ====================

    fun create_receipt_nft(
        listing_type: u8,
        property_id: ID,
        property_address: String,
        property_type: String,
        buyer_renter: address,
        seller_landlord: address,
        amount_paid: u64,
        rental_start_date: Option<u64>,
        rental_end_date: Option<u64>,
        rental_period_months: Option<u64>,
        monthly_rent: Option<u64>,
        metadata_uri: String,
        timestamp: u64,
        ctx: &mut TxContext
    ): PropertyReceipt {
        let receipt = PropertyReceipt {
            id: object::new(ctx),
            listing_type,
            timestamp,
            property_id,
            property_address,
            property_type,
            buyer_renter_address: buyer_renter,
            seller_landlord_address: seller_landlord,
            amount_paid,
            rental_start_date,
            rental_end_date,
            rental_period_months,
            monthly_rent,
            metadata_uri,
        };

        event::emit(ReceiptMinted {
            receipt_id: object::id(&receipt),
            recipient: buyer_renter,
            listing_type,
            amount: amount_paid,
            timestamp,
        });

        receipt
    }

    // ==================== View/Getter Functions ====================

    public fun get_user_profile(registry: &ProfileRegistry, user_address: address): &UserProfile {
        assert!(table::contains(&registry.profiles, user_address), E_PROFILE_NOT_FOUND);
        table::borrow(&registry.profiles, user_address)
    }

    public fun has_profile(registry: &ProfileRegistry, user_address: address): bool {
        table::contains(&registry.profiles, user_address)
    }

    public fun get_receipt_ids(escrow: &Escrow): (Option<ID>, Option<ID>) {
        (escrow.buyer_renter_receipt_id, escrow.seller_landlord_receipt_id)
    }

    public fun get_property_status(property: &PropertyListing): u8 {
        property.status
    }

    public fun get_property_listing_type(property: &PropertyListing): u8 {
        property.listing_type
    }

    public fun is_property_locked(property: &PropertyListing): bool {
        property.status == STATUS_IN_ESCROW
    }

    public fun get_escrow_amount(escrow: &Escrow): u64 {
        escrow.amount
    }

    public fun is_escrow_resolved(escrow: &Escrow): bool {
        escrow.resolved
    }

    public fun is_dispute_raised(escrow: &Escrow): bool {
        escrow.dispute_raised
    }

    public fun get_confirmation_status(escrow: &Escrow): (bool, bool) {
        (escrow.buyer_renter_confirmed, escrow.seller_landlord_confirmed)
    }

    public fun get_receipt_amount(receipt: &PropertyReceipt): u64 {
        receipt.amount_paid
    }

    public fun get_property_images(property: &PropertyListing): vector<String> {
        property.images_cids
    }

    public fun get_property_video(property: &PropertyListing): String {
        property.video_cid
    }

    public fun get_property_documents(property: &PropertyListing): Option<String> {
        property.documents_cid
    }

    public fun get_property_price(property: &PropertyListing): u64 {
        property.price
    }

    public fun get_property_owner(property: &PropertyListing): address {
        property.owner
    }

    public fun get_escrow_buyer_renter(escrow: &Escrow): address {
        escrow.buyer_renter
    }

    public fun get_escrow_seller_landlord(escrow: &Escrow): address {
        escrow.seller_landlord
    }

    public fun get_rental_dates(property: &PropertyListing): (Option<u64>, Option<u64>) {
        (property.rental_start_date, property.rental_end_date)
    }

    // ==================== Test Helper Functions ====================
    
    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }

    #[test_only]
    public fun create_admin_cap_for_testing(ctx: &mut TxContext): AdminCap {
        AdminCap {
            id: object::new(ctx),
        }
    }
}