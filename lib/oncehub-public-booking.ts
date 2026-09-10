import {
  bookingLinks,
  type BookingLinkKey,
} from "./booking-links";

type OnceHubBookingUrlOptions = {
  booking: BookingLinkKey;
  name?: string;
  email?: string;
  phone?: string;
  skipBookingForm?: boolean;
};

export function buildOnceHubBookingUrl(
  options: OnceHubBookingUrlOptions
) {
  const {
    booking,
    name,
    email,
    phone,
    skipBookingForm = false,
  } = options;

  const baseUrl = bookingLinks[booking];

  const params = new URLSearchParams();

  if (name?.trim()) {
    params.set("name", name.trim());
  }

  if (email?.trim()) {
    params.set("email", email.trim());
  }

  if (phone?.trim()) {
    params.set("mobile_phone", phone.trim());
  }

  if (skipBookingForm) {
    params.set("skip", "1");
  }

  const query = params.toString();

  if (!query) {
    return baseUrl;
  }

  return `${baseUrl}?${query}`;
}
