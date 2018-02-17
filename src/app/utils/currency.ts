import * as numeral from "numeral";

try {
  numeral.register('locale', 'de', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    abbreviations: {
      thousand: 't',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    ordinal: () => '',
    currency: {
      symbol: '€'
    }
  });
  numeral.locale('de');
} catch {
}

export const format = (amount) => numeral(amount).format('0.00 $');
