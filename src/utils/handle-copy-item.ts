export const handleCopyItem = async (sentence: string) => {
  try {
    await navigator.clipboard.writeText(sentence);
  } catch (error) {
    console.error("Failed to copy text: ", error);
  }
};
