
const RESOURCES = [
	{ name: 'address', type: 'addresses', api: 'addresses', model: 'Address' },
	{ name: 'adjustment', type: 'adjustments', api: 'adjustments', model: 'Adjustment' },
	{ name: 'adyen_gateway', type: 'adyen_gateways', api: 'adyen_gateways', model: 'AdyenGateway' },
	{ name: 'adyen_payment', type: 'adyen_payments', api: 'adyen_payments', model: 'AdyenPayment' },
	{ name: 'application', type: 'applications', api: 'application', model: 'Application', singleton: true },
	{ name: 'attachment', type: 'attachments', api: 'attachments', model: 'Attachment' },
	{ name: 'authorization', type: 'authorizations', api: 'authorizations', model: 'Authorization' },
	{ name: 'avalara_account', type: 'avalara_accounts', api: 'avalara_accounts', model: 'AvalaraAccount' },
	{ name: 'axerve_gateway', type: 'axerve_gateways', api: 'axerve_gateways', model: 'AxerveGateway' },
	{ name: 'axerve_payment', type: 'axerve_payments', api: 'axerve_payments', model: 'AxervePayment' },
	{ name: 'bing_geocoder', type: 'bing_geocoders', api: 'bing_geocoders', model: 'BingGeocoder' },
	{ name: 'braintree_gateway', type: 'braintree_gateways', api: 'braintree_gateways', model: 'BraintreeGateway' },
	{ name: 'braintree_payment', type: 'braintree_payments', api: 'braintree_payments', model: 'BraintreePayment' },
	{ name: 'bundle', type: 'bundles', api: 'bundles', model: 'Bundle' },
	{ name: 'buy_x_pay_y_promotion', type: 'buy_x_pay_y_promotions', api: 'buy_x_pay_y_promotions', model: 'BuyXPayYPromotion' },
	{ name: 'capture', type: 'captures', api: 'captures', model: 'Capture' },
	{ name: 'carrier_account', type: 'carrier_accounts', api: 'carrier_accounts', model: 'CarrierAccount' },
	{ name: 'checkout_com_gateway', type: 'checkout_com_gateways', api: 'checkout_com_gateways', model: 'CheckoutComGateway' },
	{ name: 'checkout_com_payment', type: 'checkout_com_payments', api: 'checkout_com_payments', model: 'CheckoutComPayment' },
	{ name: 'cleanup', type: 'cleanups', api: 'cleanups', model: 'Cleanup' },
	{ name: 'coupon_codes_promotion_rule', type: 'coupon_codes_promotion_rules', api: 'coupon_codes_promotion_rules', model: 'CouponCodesPromotionRule' },
	{ name: 'coupon_recipient', type: 'coupon_recipients', api: 'coupon_recipients', model: 'CouponRecipient' },
	{ name: 'coupon', type: 'coupons', api: 'coupons', model: 'Coupon' },
	{ name: 'custom_promotion_rule', type: 'custom_promotion_rules', api: 'custom_promotion_rules', model: 'CustomPromotionRule' },
	{ name: 'customer_address', type: 'customer_addresses', api: 'customer_addresses', model: 'CustomerAddress' },
	{ name: 'customer_group', type: 'customer_groups', api: 'customer_groups', model: 'CustomerGroup' },
	{ name: 'customer_password_reset', type: 'customer_password_resets', api: 'customer_password_resets', model: 'CustomerPasswordReset' },
	{ name: 'customer_payment_source', type: 'customer_payment_sources', api: 'customer_payment_sources', model: 'CustomerPaymentSource' },
	{ name: 'customer_subscription', type: 'customer_subscriptions', api: 'customer_subscriptions', model: 'CustomerSubscription' },
	{ name: 'customer', type: 'customers', api: 'customers', model: 'Customer' },
	{ name: 'delivery_lead_time', type: 'delivery_lead_times', api: 'delivery_lead_times', model: 'DeliveryLeadTime' },
	{ name: 'discount_engine_item', type: 'discount_engine_items', api: 'discount_engine_items', model: 'DiscountEngineItem' },
	{ name: 'discount_engine', type: 'discount_engines', api: 'discount_engines', model: 'DiscountEngine' },
	{ name: 'event_callback', type: 'event_callbacks', api: 'event_callbacks', model: 'EventCallback' },
	{ name: 'event', type: 'events', api: 'events', model: 'Event' },
	{ name: 'export', type: 'exports', api: 'exports', model: 'Export' },
	{ name: 'external_gateway', type: 'external_gateways', api: 'external_gateways', model: 'ExternalGateway' },
	{ name: 'external_payment', type: 'external_payments', api: 'external_payments', model: 'ExternalPayment' },
	{ name: 'external_promotion', type: 'external_promotions', api: 'external_promotions', model: 'ExternalPromotion' },
	{ name: 'external_tax_calculator', type: 'external_tax_calculators', api: 'external_tax_calculators', model: 'ExternalTaxCalculator' },
	{ name: 'fixed_amount_promotion', type: 'fixed_amount_promotions', api: 'fixed_amount_promotions', model: 'FixedAmountPromotion' },
	{ name: 'fixed_price_promotion', type: 'fixed_price_promotions', api: 'fixed_price_promotions', model: 'FixedPricePromotion' },
	{ name: 'flex_promotion', type: 'flex_promotions', api: 'flex_promotions', model: 'FlexPromotion' },
	{ name: 'free_gift_promotion', type: 'free_gift_promotions', api: 'free_gift_promotions', model: 'FreeGiftPromotion' },
	{ name: 'free_shipping_promotion', type: 'free_shipping_promotions', api: 'free_shipping_promotions', model: 'FreeShippingPromotion' },
	{ name: 'geocoder', type: 'geocoders', api: 'geocoders', model: 'Geocoder' },
	{ name: 'gift_card_recipient', type: 'gift_card_recipients', api: 'gift_card_recipients', model: 'GiftCardRecipient' },
	{ name: 'gift_card', type: 'gift_cards', api: 'gift_cards', model: 'GiftCard' },
	{ name: 'google_geocoder', type: 'google_geocoders', api: 'google_geocoders', model: 'GoogleGeocoder' },
	{ name: 'import', type: 'imports', api: 'imports', model: 'Import' },
	{ name: 'in_stock_subscription', type: 'in_stock_subscriptions', api: 'in_stock_subscriptions', model: 'InStockSubscription' },
	{ name: 'inventory_model', type: 'inventory_models', api: 'inventory_models', model: 'InventoryModel' },
	{ name: 'inventory_return_location', type: 'inventory_return_locations', api: 'inventory_return_locations', model: 'InventoryReturnLocation' },
	{ name: 'inventory_stock_location', type: 'inventory_stock_locations', api: 'inventory_stock_locations', model: 'InventoryStockLocation' },
	{ name: 'klarna_gateway', type: 'klarna_gateways', api: 'klarna_gateways', model: 'KlarnaGateway' },
	{ name: 'klarna_payment', type: 'klarna_payments', api: 'klarna_payments', model: 'KlarnaPayment' },
	{ name: 'line_item_option', type: 'line_item_options', api: 'line_item_options', model: 'LineItemOption' },
	{ name: 'line_item', type: 'line_items', api: 'line_items', model: 'LineItem' },
	{ name: 'link', type: 'links', api: 'links', model: 'Link' },
	{ name: 'manual_gateway', type: 'manual_gateways', api: 'manual_gateways', model: 'ManualGateway' },
	{ name: 'manual_tax_calculator', type: 'manual_tax_calculators', api: 'manual_tax_calculators', model: 'ManualTaxCalculator' },
	{ name: 'market', type: 'markets', api: 'markets', model: 'Market' },
	{ name: 'merchant', type: 'merchants', api: 'merchants', model: 'Merchant' },
	{ name: 'notification', type: 'notifications', api: 'notifications', model: 'Notification' },
	{ name: 'order_amount_promotion_rule', type: 'order_amount_promotion_rules', api: 'order_amount_promotion_rules', model: 'OrderAmountPromotionRule' },
	{ name: 'order_copy', type: 'order_copies', api: 'order_copies', model: 'OrderCopy' },
	{ name: 'order_factory', type: 'order_factories', api: 'order_factories', model: 'OrderFactory' },
	{ name: 'order_subscription_item', type: 'order_subscription_items', api: 'order_subscription_items', model: 'OrderSubscriptionItem' },
	{ name: 'order_subscription', type: 'order_subscriptions', api: 'order_subscriptions', model: 'OrderSubscription' },
	{ name: 'order', type: 'orders', api: 'orders', model: 'Order' },
	{ name: 'organization', type: 'organizations', api: 'organization', model: 'Organization', singleton: true },
	{ name: 'package', type: 'packages', api: 'packages', model: 'Package' },
	{ name: 'parcel_line_item', type: 'parcel_line_items', api: 'parcel_line_items', model: 'ParcelLineItem' },
	{ name: 'parcel', type: 'parcels', api: 'parcels', model: 'Parcel' },
	{ name: 'payment_gateway', type: 'payment_gateways', api: 'payment_gateways', model: 'PaymentGateway' },
	{ name: 'payment_method', type: 'payment_methods', api: 'payment_methods', model: 'PaymentMethod' },
	{ name: 'payment_option', type: 'payment_options', api: 'payment_options', model: 'PaymentOption' },
	{ name: 'paypal_gateway', type: 'paypal_gateways', api: 'paypal_gateways', model: 'PaypalGateway' },
	{ name: 'paypal_payment', type: 'paypal_payments', api: 'paypal_payments', model: 'PaypalPayment' },
	{ name: 'percentage_discount_promotion', type: 'percentage_discount_promotions', api: 'percentage_discount_promotions', model: 'PercentageDiscountPromotion' },
	{ name: 'price_frequency_tier', type: 'price_frequency_tiers', api: 'price_frequency_tiers', model: 'PriceFrequencyTier' },
	{ name: 'price_list_scheduler', type: 'price_list_schedulers', api: 'price_list_schedulers', model: 'PriceListScheduler' },
	{ name: 'price_list', type: 'price_lists', api: 'price_lists', model: 'PriceList' },
	{ name: 'price_tier', type: 'price_tiers', api: 'price_tiers', model: 'PriceTier' },
	{ name: 'price_volume_tier', type: 'price_volume_tiers', api: 'price_volume_tiers', model: 'PriceVolumeTier' },
	{ name: 'price', type: 'prices', api: 'prices', model: 'Price' },
	{ name: 'promotion_rule', type: 'promotion_rules', api: 'promotion_rules', model: 'PromotionRule' },
	{ name: 'promotion', type: 'promotions', api: 'promotions', model: 'Promotion' },
	{ name: 'recurring_order_copy', type: 'recurring_order_copies', api: 'recurring_order_copies', model: 'RecurringOrderCopy' },
	{ name: 'refund', type: 'refunds', api: 'refunds', model: 'Refund' },
	{ name: 'reserved_stock', type: 'reserved_stocks', api: 'reserved_stocks', model: 'ReservedStock' },
	{ name: 'resource_error', type: 'resource_errors', api: 'resource_errors', model: 'ResourceError' },
	{ name: 'return_line_item', type: 'return_line_items', api: 'return_line_items', model: 'ReturnLineItem' },
	{ name: 'return', type: 'returns', api: 'returns', model: 'Return' },
	{ name: 'satispay_gateway', type: 'satispay_gateways', api: 'satispay_gateways', model: 'SatispayGateway' },
	{ name: 'satispay_payment', type: 'satispay_payments', api: 'satispay_payments', model: 'SatispayPayment' },
	{ name: 'shipment', type: 'shipments', api: 'shipments', model: 'Shipment' },
	{ name: 'shipping_category', type: 'shipping_categories', api: 'shipping_categories', model: 'ShippingCategory' },
	{ name: 'shipping_method_tier', type: 'shipping_method_tiers', api: 'shipping_method_tiers', model: 'ShippingMethodTier' },
	{ name: 'shipping_method', type: 'shipping_methods', api: 'shipping_methods', model: 'ShippingMethod' },
	{ name: 'shipping_weight_tier', type: 'shipping_weight_tiers', api: 'shipping_weight_tiers', model: 'ShippingWeightTier' },
	{ name: 'shipping_zone', type: 'shipping_zones', api: 'shipping_zones', model: 'ShippingZone' },
	{ name: 'sku_list_item', type: 'sku_list_items', api: 'sku_list_items', model: 'SkuListItem' },
	{ name: 'sku_list_promotion_rule', type: 'sku_list_promotion_rules', api: 'sku_list_promotion_rules', model: 'SkuListPromotionRule' },
	{ name: 'sku_list', type: 'sku_lists', api: 'sku_lists', model: 'SkuList' },
	{ name: 'sku_option', type: 'sku_options', api: 'sku_options', model: 'SkuOption' },
	{ name: 'sku', type: 'skus', api: 'skus', model: 'Sku' },
	{ name: 'stock_item', type: 'stock_items', api: 'stock_items', model: 'StockItem' },
	{ name: 'stock_line_item', type: 'stock_line_items', api: 'stock_line_items', model: 'StockLineItem' },
	{ name: 'stock_location', type: 'stock_locations', api: 'stock_locations', model: 'StockLocation' },
	{ name: 'stock_reservation', type: 'stock_reservations', api: 'stock_reservations', model: 'StockReservation' },
	{ name: 'stock_transfer', type: 'stock_transfers', api: 'stock_transfers', model: 'StockTransfer' },
	{ name: 'store', type: 'stores', api: 'stores', model: 'Store' },
	{ name: 'stripe_gateway', type: 'stripe_gateways', api: 'stripe_gateways', model: 'StripeGateway' },
	{ name: 'stripe_payment', type: 'stripe_payments', api: 'stripe_payments', model: 'StripePayment' },
	{ name: 'stripe_tax_account', type: 'stripe_tax_accounts', api: 'stripe_tax_accounts', model: 'StripeTaxAccount' },
	{ name: 'subscription_model', type: 'subscription_models', api: 'subscription_models', model: 'SubscriptionModel' },
	{ name: 'tag', type: 'tags', api: 'tags', model: 'Tag' },
	{ name: 'talon_one_account', type: 'talon_one_accounts', api: 'talon_one_accounts', model: 'TalonOneAccount' },
	{ name: 'tax_calculator', type: 'tax_calculators', api: 'tax_calculators', model: 'TaxCalculator' },
	{ name: 'tax_category', type: 'tax_categories', api: 'tax_categories', model: 'TaxCategory' },
	{ name: 'tax_rule', type: 'tax_rules', api: 'tax_rules', model: 'TaxRule' },
	{ name: 'taxjar_account', type: 'taxjar_accounts', api: 'taxjar_accounts', model: 'TaxjarAccount' },
	{ name: 'transaction', type: 'transactions', api: 'transactions', model: 'Transaction' },
	{ name: 'version', type: 'versions', api: 'versions', model: 'Version' },
	{ name: 'vertex_account', type: 'vertex_accounts', api: 'vertex_accounts', model: 'VertexAccount' },
	{ name: 'void', type: 'voids', api: 'voids', model: 'Void' },
	{ name: 'webhook', type: 'webhooks', api: 'webhooks', model: 'Webhook' },
	{ name: 'wire_transfer', type: 'wire_transfers', api: 'wire_transfers', model: 'WireTransfer' },
] as const



export default RESOURCES
