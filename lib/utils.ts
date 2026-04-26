/**
 * Format a number as Nigerian Naira currency
 * @param amount - The number to format
 * @returns Formatted string with ₦ symbol or fallback on error
 */
export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  try {
    return new Intl.NumberFormat('en-NG', {
      currency: currency || 'NGN',
      style: 'currency',
      currencyDisplay: 'symbol',
    }).format(amount);
  } catch {
    // Fallback: manual formatting if Intl fails
    try {
      const formatted = amount.toLocaleString('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return `₦${formatted}`;
    } catch {
      // Final fallback: basic string conversion
      return `₦${amount.toFixed(2)}`;
    }
  }
}