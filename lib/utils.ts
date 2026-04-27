import dayjs from "dayjs";

export function formatCurrency(amount: number, currency: string = "NGN"): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      currency: currency || "NGN",
      style: "currency",
      currencyDisplay: "symbol",
    }).format(amount)
  } catch {
    // Fallback: manual formatting if Intl fails
    try {
      const formatted = amount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      return `₦${formatted}`
    } catch {
      // Final fallback: basic string conversion
      return `₦${amount.toFixed(2)}`
    }
  }
}

export const formatSubscriptionDateTime = (value?: string): string => {
  if (!value) return "Not provided"
  const parsedDate = dayjs(value)
  return parsedDate.isValid() ? parsedDate.format("MM/DD/YYYY") : "Not provided"
}

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown"
  return value.charAt(0).toUpperCase() + value.slice(1)
}
