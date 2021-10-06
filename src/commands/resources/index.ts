import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import cliux from 'cli-ux'


export default class ResourcesIndex extends Command {

	static description = 'list all the available Commerce Layer API resources'

	static examples = [
		'$ cl-resources resources',
		'$ cl-res resources',
		'$ commercelayer resources',
		'$ cl resources',
	]

	static flags = {
		help: flags.help({ char: 'h' }),
	}

	static args = []

	async run() {

		this.parse(ResourcesIndex)

		this.log(chalk.blueBright('\n-= Commerce Layer API available resources =-\n'))

		const resourceArray = resourceList('api').map(r => {
			return { name: r, url: `https://docs.commercelayer.io/api/resources/${r}` }
		})

		cliux.table(resourceArray,
			{
				key: { header: 'NAME', minWidth: 35, get: row => chalk.blueBright(row.name) },
				description: { header: 'ONLINE DOCUMENTATION URL\n', get: row => row.url },
			},
			{
				printLine: this.log,
			})
		this.log()

	}


	async catch(error: any) {
		if ((error.code === 'EEXIT') && (error.message === 'EEXIT: 0')) return
		return super.catch(error)
	}


}


const resources: Resource[] = [
	{ name: 'address', api: 'addresses', model: 'Address' },
	{ name: 'adjustment', api: 'adjustments', model: 'Adjustment' },
	{ name: 'adyen_gateway', api: 'adyen_gateways', model: 'AdyenGateway' },
	{ name: 'adyen_payment', api: 'adyen_payments', model: 'AdyenPayment' },
	{ name: 'application', api: 'application', model: 'Application', singleton: true },
	{ name: 'attachment', api: 'attachments', model: 'Attachment' },
	{ name: 'authorization', api: 'authorizations', model: 'Authorization' },
	{ name: 'avalara_account', api: 'avalara_accounts', model: 'AvalaraAccount' },
	{ name: 'billing_info_validation_rule', api: 'billing_info_validation_rules', model: 'BillingInfoValidationRule' },
	{ name: 'bing_geocoder', api: 'bing_geocoders', model: 'BingGeocoder' },
	{ name: 'braintree_gateway', api: 'braintree_gateways', model: 'BraintreeGateway' },
	{ name: 'braintree_payment', api: 'braintree_payments', model: 'BraintreePayment' },
	{ name: 'bundle', api: 'bundles', model: 'Bundle' },
	{ name: 'capture', api: 'captures', model: 'Capture' },
	{ name: 'carrier_account', api: 'carrier_accounts', model: 'CarrierAccount' },
	{ name: 'checkout_com_gateway', api: 'checkout_com_gateways', model: 'CheckoutComGateway' },
	{ name: 'checkout_com_payment', api: 'checkout_com_payments', model: 'CheckoutComPayment' },
	{ name: 'coupon_codes_promotion_rule', api: 'coupon_codes_promotion_rules', model: 'CouponCodesPromotionRule' },
	{ name: 'coupon', api: 'coupons', model: 'Coupon' },
	{ name: 'customer_address', api: 'customer_addresses', model: 'CustomerAddress' },
	{ name: 'customer_group', api: 'customer_groups', model: 'CustomerGroup' },
	{ name: 'customer_password_reset', api: 'customer_password_resets', model: 'CustomerPasswordReset' },
	{ name: 'customer_payment_source', api: 'customer_payment_sources', model: 'CustomerPaymentSource' },
	{ name: 'customer_subscription', api: 'customer_subscriptions', model: 'CustomerSubscription' },
	{ name: 'customer', api: 'customers', model: 'Customer' },
	{ name: 'delivery_lead_time', api: 'delivery_lead_times', model: 'DeliveryLeadTime' },
	{ name: 'external_gateway', api: 'external_gateways', model: 'ExternalGateway' },
	{ name: 'external_payment', api: 'external_payments', model: 'ExternalPayment' },
	{ name: 'external_promotion', api: 'external_promotions', model: 'ExternalPromotion' },
	{ name: 'external_tax_calculator', api: 'external_tax_calculators', model: 'ExternalTaxCalculator' },
	{ name: 'fixed_amount_promotion', api: 'fixed_amount_promotions', model: 'FixedAmountPromotion' },
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
	{ name: 'line_item_option', api: 'line_item_options', model: 'LineItemOption' },
	{ name: 'line_item', api: 'line_items', model: 'LineItem' },
	{ name: 'manual_gateway', api: 'manual_gateways', model: 'ManualGateway' },
	{ name: 'manual_tax_calculator', api: 'manual_tax_calculators', model: 'ManualTaxCalculator' },
	{ name: 'market', api: 'markets', model: 'Market' },
	{ name: 'merchant', api: 'merchants', model: 'Merchant' },
	{ name: 'order_amount_promotion_rule', api: 'order_amount_promotion_rules', model: 'OrderAmountPromotionRule' },
	{ name: 'order_copy', api: 'order_copies', model: 'OrderCopy' },
	{ name: 'order_subscription', api: 'order_subscriptions', model: 'OrderSubscription' },
	{ name: 'order', api: 'orders', model: 'Order' },
	{ name: 'organization', api: 'organization', model: 'Organization', singleton: true },
	{ name: 'package', api: 'packages', model: 'Package' },
	{ name: 'parcel_line_item', api: 'parcel_line_items', model: 'ParcelLineItem' },
	{ name: 'parcel', api: 'parcels', model: 'Parcel' },
	{ name: 'payment_gateway', api: 'payment_gateways', model: 'PaymentGateway' },
	{ name: 'payment_method', api: 'payment_methods', model: 'PaymentMethod' },
	{ name: 'paypal_gateway', api: 'paypal_gateways', model: 'PaypalGateway' },
	{ name: 'paypal_payment', api: 'paypal_payments', model: 'PaypalPayment' },
	{ name: 'percentage_discount_promotion', api: 'percentage_discount_promotions', model: 'PercentageDiscountPromotion' },
	{ name: 'price_list', api: 'price_lists', model: 'PriceList' },
	{ name: 'price', api: 'prices', model: 'Price' },
	{ name: 'promotion_rule', api: 'promotion_rules', model: 'PromotionRule' },
	{ name: 'promotion', api: 'promotions', model: 'Promotion' },
	{ name: 'refund', api: 'refunds', model: 'Refund' },
	{ name: 'return_line_item', api: 'return_line_items', model: 'ReturnLineItem' },
	{ name: 'return', api: 'returns', model: 'Return' },
	{ name: 'shipment', api: 'shipments', model: 'Shipment' },
	{ name: 'shipping_category', api: 'shipping_categories', model: 'ShippingCategory' },
	{ name: 'shipping_method', api: 'shipping_methods', model: 'ShippingMethod' },
	{ name: 'shipping_zone', api: 'shipping_zones', model: 'ShippingZone' },
	{ name: 'sku_list_item', api: 'sku_list_items', model: 'SkuListItem' },
	{ name: 'sku_list_promotion_rule', api: 'sku_list_promotion_rules', model: 'SkuListPromotionRule' },
	{ name: 'sku_list', api: 'sku_lists', model: 'SkuList' },
	{ name: 'sku_option', api: 'sku_options', model: 'SkuOption' },
	{ name: 'sku', api: 'skus', model: 'Sku' },
	{ name: 'stock_item', api: 'stock_items', model: 'StockItem' },
	{ name: 'stock_line_item', api: 'stock_line_items', model: 'StockLineItem' },
	{ name: 'stock_location', api: 'stock_locations', model: 'StockLocation' },
	{ name: 'stock_transfer', api: 'stock_transfers', model: 'StockTransfer' },
	{ name: 'stripe_gateway', api: 'stripe_gateways', model: 'StripeGateway' },
	{ name: 'stripe_payment', api: 'stripe_payments', model: 'StripePayment' },
	{ name: 'tax_calculator', api: 'tax_calculators', model: 'TaxCalculator' },
	{ name: 'tax_category', api: 'tax_categories', model: 'TaxCategory' },
	{ name: 'tax_rule', api: 'tax_rules', model: 'TaxRule' },
	{ name: 'taxjar_account', api: 'taxjar_accounts', model: 'TaxjarAccount' },
	{ name: 'transaction', api: 'transactions', model: 'Transaction' },
	{ name: 'void', api: 'voids', model: 'Void' },
	{ name: 'webhook', api: 'webhooks', model: 'Webhook' },
	{ name: 'wire_transfer', api: 'wire_transfers', model: 'WireTransfer' },
]


interface Resource {
	name: string;
	api: string;
	model: string;
	singleton?: boolean;
}


const findResource = (res: string, { singular = false } = {}): (Resource | undefined) => {
	if (res === undefined) return undefined
	const lowRes = res.toLowerCase()
	return resources.find(r => {
		return (lowRes === r.api) || (singular && (lowRes === r.name))
	})
}


const resourceList = (field: 'name' | 'api' | 'model'): string[] => {
	return resources.map(r => r[field])
}


export { findResource, Resource }
