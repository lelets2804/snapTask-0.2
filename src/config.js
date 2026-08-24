export const BACKEND_URL = "https://snaptaskbackend.onrender.com";

export const IMAGE_ACCEPT = "image/*";
export const VIDEO_ACCEPT = "video/*";
export const DOCUMENT_ACCEPT = [
	IMAGE_ACCEPT,
	"application/pdf",
	".doc",
	".docx",
	".txt",
].join(",");