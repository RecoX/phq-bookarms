import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

/**
* Synchronous validator that checks whether the input is a valid HTTP(S) URL
* and includes a top-level domain (e.g. '.com', '.org').
*
* @param control The form control containing the URL string
* @returns Null if valid, or a validation error object
*/
export function validateUrlFormat(control: AbstractControl): ValidationErrors | null {
 const value = control.value?.trim();
 if (!value) return null;

 try {
   const url = new URL(value);
   // Ensure the protocol is either http or https
   const hasHttpProtocol = url.protocol === 'http:' || url.protocol === 'https:';

   // Extract the top-level domain (TLD) from the hostname
   const tld = url.hostname.split('.').pop() ?? '';

   // Validate the TLD: must be alphabetic and at least 2 characters long
   const hasValidTld = /^[a-z]{2,}$/i.test(tld);

   return hasHttpProtocol && hasValidTld ? null : { invalidUrl: true };
 } catch {
   return { invalidUrl: true };
 }
}

/**
 * Asynchronous validator that checks if a URL is reachable by sending a HEAD request.
 *
 * @returns A function that takes a form control and returns a promise resolving to null or a validation error object.
 */
export function checkUrlAvailability(): AsyncValidatorFn {
  let debounceTimer: ReturnType<typeof setTimeout>;

  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      // Clear the previous timer to avoid multiple requests in quick succession
      clearTimeout(debounceTimer);

      // Debounce the request to avoid sending too many requests in a short time
      // This is useful for user input where the URL might change frequently
      debounceTimer = setTimeout(() => {
        const url = control.value?.trim();
        if (!url) {
          resolve(null);
          return;
        }

        // Check if the URL is valid before making a request
        try {
          new URL(url);
        } catch {
          resolve(null);
          return;
        }

        // Send a HEAD request to check if the URL is reachable
        // Using 'no-cors' mode to avoid CORS issues, but this may not work for all URLs
        fetch(url, { method: 'HEAD', mode: 'no-cors' })
          .then(() => resolve(null))
          .catch(() => resolve({ unreachableUrl: true }));
      }, 1000);
    });
  };
}

