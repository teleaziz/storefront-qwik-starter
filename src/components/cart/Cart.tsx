import { component$, PropFunction, useContext } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { APP_STATE } from '~/constants';
import { CurrencyCode } from '~/types';
import CartContents from '../cart-contents/CartContents';
import Price from '../products/Price';

export default component$<{ showCart: boolean; onToggleCart$: PropFunction<() => void> }>(
	({ showCart = false, onToggleCart$ }) => {
		const location = useLocation();
		const { activeOrder } = useContext(APP_STATE);
		const currencyCode = activeOrder?.currencyCode || CurrencyCode.Usd;
		const editable = !location.pathname.startsWith('/checkout');
		return !!showCart ? (
			<div
				class="fixed inset-0 overflow-hidden z-20"
				id="headlessui-dialog-8"
				role="dialog"
				aria-modal="true"
				aria-labelledby="headlessui-dialog-title-12"
			>
				<div class="absolute inset-0 overflow-hidden">
					<div
						class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity opacity-100"
						id="headlessui-dialog-overlay-10"
						aria-hidden="true"
					></div>
					<div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<div class="w-screen max-w-md translate-x-0">
							<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
								<div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
									<div class="flex items-start justify-between">
										<h2 class="text-lg font-medium text-gray-900" id="headlessui-dialog-title-12">
											Shopping cart
										</h2>
										<div class="ml-3 h-7 flex items-center">
											<button
												type="button"
												class="-m-2 p-2 text-gray-400 hover:text-gray-500"
												onClick$={onToggleCart$}
											>
												<span class="sr-only">Close panel</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="2"
													stroke="currentColor"
													aria-hidden="true"
													class="h-6 w-6"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M6 18L18 6M6 6l12 12"
													></path>
												</svg>
											</button>
										</div>
									</div>
									<div className="mt-8">
										{!!activeOrder && activeOrder.totalQuantity ? (
											<CartContents
												orderLines={activeOrder?.lines ?? []}
												currencyCode={currencyCode!}
												editable={editable}
												removeItem={() => {}}
												adjustOrderLine={() => {}}
											/>
										) : (
											<div className="flex items-center justify-center h-48 text-xl text-gray-400">
												Your cart is empty
											</div>
										)}
									</div>
								</div>
								{activeOrder?.totalQuantity && editable && (
									<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
										<div className="flex justify-between text-base font-medium text-gray-900">
											<p>Subtotal</p>
											<p>
												{currencyCode && (
													<Price
														priceWithTax={activeOrder?.subTotalWithTax ?? 0}
														currencyCode={currencyCode}
													/>
												)}
											</p>
										</div>
										<p className="mt-0.5 text-sm text-gray-500">
											Shipping will be calculated at checkout.
										</p>
										<div className="mt-6">
											<a
												href="/checkout"
												onClick$={onToggleCart$}
												className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
											>
												Checkout
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		) : (
			<></>
		);
	}
);
