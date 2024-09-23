export default function useCryoto() {
  const bytesToBase64 = (bytes: Uint8Array): string => {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
  };

  const base64ToBytes = (base64: string): Uint8Array => {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0) as number);
  };

  const encodingData = (bytes: string): string => {
    const validUTF16StringEncoded = bytesToBase64(new TextEncoder().encode(bytes));
    return validUTF16StringEncoded;
  };

  const decodingData = (base64: string): string => {
    const validUTF16StringDecoded = new TextDecoder().decode(base64ToBytes(base64));
    return validUTF16StringDecoded;
  };

  return { bytesToBase64, base64ToBytes, encodingData, decodingData };
}
