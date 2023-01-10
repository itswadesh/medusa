import { asClass, asFunction, asValue, createContainer } from "awilix"
import { MockManager, MockRepository } from "medusa-test-utils"
import PaymentProviderService from "../payment-provider";
import { PaymentProviderServiceMock } from "../__mocks__/payment-provider";
import { CustomerServiceMock } from "../__mocks__/customer";
import { FlagRouter } from "../../utils/flag-router";
import Logger from "../../loaders/logger";
import {
  AbstractPaymentProcessor,
  PaymentProcessorContext,
  PaymentProcessorError,
  PaymentProcessorSessionResponse
} from "../../interfaces";
import { PaymentSessionStatus } from "../../models";

export const defaultContainer = createContainer()
defaultContainer.register("paymentProviderService", asClass(PaymentProviderService))
defaultContainer.register("manager", asValue(MockManager))
defaultContainer.register("paymentSessionRepository", asValue(MockRepository()))
defaultContainer.register("paymentProviderRepository", asValue(PaymentProviderServiceMock))
defaultContainer.register("paymentRepository", asValue(MockRepository()))
defaultContainer.register("refundRepository", asValue(MockRepository()))
defaultContainer.register("customerService", asValue(CustomerServiceMock))
defaultContainer.register("featureFlagRouter", asValue(new FlagRouter({})))
defaultContainer.register("logger", asValue(Logger))
defaultContainer.register("pp_payment_processor", asFunction((cradle) => new PaymentProcessor(cradle)))

export class PaymentProcessor extends AbstractPaymentProcessor {
  constructor(container) {
    super(container);
  }
  authorizePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | void> {
    return Promise.resolve(undefined);
  }

  cancelPayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | void> {
    return Promise.resolve(undefined);
  }

  capturePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | void> {
    return Promise.resolve(undefined);
  }

  deletePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | void> {
    return Promise.resolve(undefined);
  }

  getPaymentStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus> {
    return Promise.resolve(PaymentSessionStatus.PENDING);
  }

  init(): Promise<void> {
    return Promise.resolve(undefined);
  }

  initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {
    return Promise.resolve({ } as PaymentProcessorSessionResponse);
  }

  refundPayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | void> {
    return Promise.resolve(undefined);
  }

  retrievePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]> {
    return Promise.resolve({ });
  }

  updatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | void> {
    return Promise.resolve(undefined);
  }
}

export const defaultPaymentSessionInputData = {
  provider_id: "payment_processor",
  cart: {
    context: {},
    id: "cart-test",
    email: "test@medusajs.com",
    shipping_address: {},
    shipping_methods: [],
    billing_address: {
      first_name: "Virgil",
      last_name: "Van Dijk",
      address_1: "24 Dunks Drive",
      city: "Los Angeles",
      country_code: "US",
      province: "CA",
      postal_code: "93011",
    },
  },
  currency_code: "usd",
  amount: 1000,
}