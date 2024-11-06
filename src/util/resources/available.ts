
const RESOURCES = [
	{ name: 'address', api: 'addresses', model: 'Address' },
	{ name: 'adjustment', api: 'adjustments', model: 'Adjustment' },
	{ name: 'adyen_gateway', api: 'adyen_gateways', model: 'AdyenGateway' },
	{ name: 'adyen_payment', api: 'adyen_payments', model: 'AdyenPayment' },
	{ name: 'application', api: 'application', model: 'Application', singleton: true },
	{ name: 'attachment', api: 'attachments', model: 'Attachment' },
	{ name: 'authorization', api: 'authorizations', model: 'Authorization' },
	{ name: 'avalara_account', api: 'avalara_accounts', model: 'AvalaraAccount' },
	{ name: 'axerve_gateway', api: 'axerve_gateways', model: 'AxerveGateway' },
	{ name: 'axerve_payment', api: 'axerve_payments', model: 'AxervePayment' },
	{ name: 'billing_info_validation_rule', api: 'billing_info_validation_rules', model: 'BillingInfoValidationRule' },
	{ name: 'bing_geocoder', api: 'bing_geocoders', model: 'BingGeocoder' },
	{ name: 'braintree_gateway', api: 'braintree_gateways', model: 'BraintreeGateway' },
	{ name: 'braintree_payment', api: 'braintree_payments', model: 'BraintreePayment' },
	{ name: 'bundle', api: 'bundles', model: 'Bundle' },
	{ name: 'buy_x_pay_y_promotion', api: 'buy_x_pay_y_promotions', model: 'BuyXPayYPromotion' },
	{ name: 'capture', api: 'captures', model: 'Capture' },
	{ name: 'carrier_account', api: 'carrier_accounts', model: 'CarrierAccount' },
	{ name: 'checkout_com_gateway', api: 'checkout_com_gateways', model: 'CheckoutComGateway' },
	{ name: 'checkout_com_payment', api: 'checkout_com_payments', model: 'CheckoutComPayment' },
	{ name: 'cleanup', api: 'cleanups', model: 'Cleanup' },
	{ name: 'coupon_codes_promotion_rule', api: 'coupon_codes_promotion_rules', model: 'CouponCodesPromotionRule' },
	{ name: 'coupon_recipient', api: 'coupon_recipients', model: 'CouponRecipient' },
	{ name: 'coupon', api: 'coupons', model: 'Coupon' },
	{ name: 'custom_promotion_rule', api: 'custom_promotion_rules', model: 'CustomPromotionRule' },
	{ name: 'customer_address', api: 'customer_addresses', model: 'CustomerAddress' },
	{ name: 'customer_group', api: 'customer_groups', model: 'CustomerGroup' },
	{ name: 'customer_password_reset', api: 'customer_password_resets', model: 'CustomerPasswordReset' },
	{ name: 'customer_payment_source', api: 'customer_payment_sources', model: 'CustomerPaymentSource' },
	{ name: 'customer_subscription', api: 'customer_subscriptions', model: 'CustomerSubscription' },
	{ name: 'customer', api: 'customers', model: 'Customer' },
	{ name: 'delivery_lead_time', api: 'delivery_lead_times', model: 'DeliveryLeadTime' },
	{ name: 'event_callback', api: 'event_callbacks', model: 'EventCallback' },
	{ name: 'event', api: 'events', model: 'Event' },
	{ name: 'export', api: 'exports', model: 'Export' },
	{ name: 'external_gateway', api: 'external_gateways', model: 'ExternalGateway' },
	{ name: 'external_payment', api: 'external_payments', model: 'ExternalPayment' },
	{ name: 'external_promotion', api: 'external_promotions', model: 'ExternalPromotion' },
	{ name: 'external_tax_calculator', api: 'external_tax_calculators', model: 'ExternalTaxCalculator' },
	{ name: 'fixed_amount_promotion', api: 'fixed_amount_promotions', model: 'FixedAmountPromotion' },
	{ name: 'fixed_price_promotion', api: 'fixed_price_promotions', model: 'FixedPricePromotion' },
	{ name: 'flex_promotion', api: 'flex_promotions', model: 'FlexPromotion' },
	{ name: 'free_gift_promotion', api: 'free_gift_promotions', model: 'FreeGiftPromotion' },
	{ name: 'free_shipping_promotion', api: 'free_shipping_promotions', model: 'FreeShippingPromotion' },
	{ name: 'geocoder', api: 'geocoders', model: 'Geocoder' },
	{ name: 'gift_card_recipient', api: 'gift_card_recipients', model: 'GiftCardRecipient' },
	{ name: 'gift_card', api: 'gift_cards', model: 'GiftCard' },
	{ name: 'google_geocoder', api: 'google_geocoders', model: 'GoogleGeocoder' },
	{ name: 'import', api: 'imports', model: 'Import' },
	{ name: 'in_stock_subscription', api: 'in_stock_subscriptions', model: 'InStockSubscription' },
	{ name: 'inventory_model', api: 'inventory_models', model: 'InventoryModel' },
	{ name: 'inventory_return_location', api: 'inventory_return_locations', model: 'InventoryReturnLocation' },
	{ name: 'inventory_stock_location', api: 'inventory_stock_locations', model: 'InventoryStockLocation' },
	{ name: 'klarna_gateway', api: 'klarna_gateways', model: 'KlarnaGateway' },
	{ name: 'klarna_payment', api: 'klarna_payments', model: 'KlarnaPayment' },
	{ name: 'line_item_option', api: 'line_item_options', model: 'LineItemOption' },
	{ name: 'line_item', api: 'line_items', model: 'LineItem' },
	{ name: 'link', api: 'links', model: 'Link' },
	{ name: 'manual_gateway', api: 'manual_gateways', model: 'ManualGateway' },
	{ name: 'manual_tax_calculator', api: 'manual_tax_calculators', model: 'ManualTaxCalculator' },
	{ name: 'market', api: 'markets', model: 'Market' },
	{ name: 'merchant', api: 'merchants', model: 'Merchant' },
	{ name: 'order_amount_promotion_rule', api: 'order_amount_promotion_rules', model: 'OrderAmountPromotionRule' },
	{ name: 'order_copy', api: 'order_copies', model: 'OrderCopy' },
	{ name: 'order_factory', api: 'order_factories', model: 'OrderFactory' },
	{ name: 'order_subscription_item', api: 'order_subscription_items', model: 'OrderSubscriptionItem' },
	{ name: 'order_subscription', api: 'order_subscriptions', model: 'OrderSubscription' },
	{ name: 'order', api: 'orders', model: 'Order' },
	{ name: 'organization', api: 'organization', model: 'Organization', singleton: true },
	{ name: 'package', api: 'packages', model: 'Package' },
	{ name: 'parcel_line_item', api: 'parcel_line_items', model: 'ParcelLineItem' },
	{ name: 'parcel', api: 'parcels', model: 'Parcel' },
	{ name: 'payment_gateway', api: 'payment_gateways', model: 'PaymentGateway' },
	{ name: 'payment_method', api: 'payment_methods', model: 'PaymentMethod' },
	{ name: 'payment_option', api: 'payment_options', model: 'PaymentOption' },
	{ name: 'paypal_gateway', api: 'paypal_gateways', model: 'PaypalGateway' },
	{ name: 'paypal_payment', api: 'paypal_payments', model: 'PaypalPayment' },
	{ name: 'percentage_discount_promotion', api: 'percentage_discount_promotions', model: 'PercentageDiscountPromotion' },
	{ name: 'price_frequency_tier', api: 'price_frequency_tiers', model: 'PriceFrequencyTier' },
	{ name: 'price_list_scheduler', api: 'price_list_schedulers', model: 'PriceListScheduler' },
	{ name: 'price_list', api: 'price_lists', model: 'PriceList' },
	{ name: 'price_tier', api: 'price_tiers', model: 'PriceTier' },
	{ name: 'price_volume_tier', api: 'price_volume_tiers', model: 'PriceVolumeTier' },
	{ name: 'price', api: 'prices', model: 'Price' },
	{ name: 'promotion_rule', api: 'promotion_rules', model: 'PromotionRule' },
	{ name: 'promotion', api: 'promotions', model: 'Promotion' },
	{ name: 'recurring_order_copy', api: 'recurring_order_copies', model: 'RecurringOrderCopy' },
	{ name: 'refund', api: 'refunds', model: 'Refund' },
	{ name: 'reserved_stock', api: 'reserved_stocks', model: 'ReservedStock' },
	{ name: 'resource_error', api: 'resource_errors', model: 'ResourceError' },
	{ name: 'return_line_item', api: 'return_line_items', model: 'ReturnLineItem' },
	{ name: 'return', api: 'returns', model: 'Return' },
	{ name: 'satispay_gateway', api: 'satispay_gateways', model: 'SatispayGateway' },
	{ name: 'satispay_payment', api: 'satispay_payments', model: 'SatispayPayment' },
	{ name: 'shipment', api: 'shipments', model: 'Shipment' },
	{ name: 'shipping_category', api: 'shipping_categories', model: 'ShippingCategory' },
	{ name: 'shipping_method_tier', api: 'shipping_method_tiers', model: 'ShippingMethodTier' },
	{ name: 'shipping_method', api: 'shipping_methods', model: 'ShippingMethod' },
	{ name: 'shipping_weight_tier', api: 'shipping_weight_tiers', model: 'ShippingWeightTier' },
	{ name: 'shipping_zone', api: 'shipping_zones', model: 'ShippingZone' },
	{ name: 'sku_list_item', api: 'sku_list_items', model: 'SkuListItem' },
	{ name: 'sku_list_promotion_rule', api: 'sku_list_promotion_rules', model: 'SkuListPromotionRule' },
	{ name: 'sku_list', api: 'sku_lists', model: 'SkuList' },
	{ name: 'sku_option', api: 'sku_options', model: 'SkuOption' },
	{ name: 'sku', api: 'skus', model: 'Sku' },
	{ name: 'stock_item', api: 'stock_items', model: 'StockItem' },
	{ name: 'stock_line_item', api: 'stock_line_items', model: 'StockLineItem' },
	{ name: 'stock_location', api: 'stock_locations', model: 'StockLocation' },
	{ name: 'stock_reservation', api: 'stock_reservations', model: 'StockReservation' },
	{ name: 'stock_transfer', api: 'stock_transfers', model: 'StockTransfer' },
	{ name: 'store', api: 'stores', model: 'Store' },
	{ name: 'stripe_gateway', api: 'stripe_gateways', model: 'StripeGateway' },
	{ name: 'stripe_payment', api: 'stripe_payments', model: 'StripePayment' },
	{ name: 'subscription_model', api: 'subscription_models', model: 'SubscriptionModel' },
	{ name: 'tag', api: 'tags', model: 'Tag' },
	{ name: 'tax_calculator', api: 'tax_calculators', model: 'TaxCalculator' },
	{ name: 'tax_category', api: 'tax_categories', model: 'TaxCategory' },
	{ name: 'tax_rule', api: 'tax_rules', model: 'TaxRule' },
	{ name: 'taxjar_account', api: 'taxjar_accounts', model: 'TaxjarAccount' },
	{ name: 'transaction', api: 'transactions', model: 'Transaction' },
	{ name: 'version', api: 'versions', model: 'Version' },
	{ name: 'void', api: 'voids', model: 'Void' },
	{ name: 'webhook', api: 'webhooks', model: 'Webhook' },
	{ name: 'wire_transfer', api: 'wire_transfers', model: 'WireTransfer' },
] as const



export default RESOURCES
