export function convertLFtoCRLF(LFstr: string) {
  return LFstr.replace(/(?<!\r)\n/g, "\r\n");
}

export function convertCRLFtoLF(CRLFstr: string) {
  return CRLFstr.replace(/\r\n/g, "\n");
}
