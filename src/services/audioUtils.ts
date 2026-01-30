export const decode = (data: any) => { return data; };
export const decodeAudioData = (data: any): Promise<AudioBuffer> => {
  return Promise.resolve({ duration: 1 } as AudioBuffer);
};
export const createBlob = (data: any) => { return new Blob([data]); };
