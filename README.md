# Cartoonify Your Images

A modern web application built with [Next.js](https://nextjs.org/) and [React](https://react.dev/) that allows users to upload an image and convert it into a high-quality cartoon using AI (Stable Diffusion via Replicate). Images are securely uploaded and stored using [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob).

## Features

- **Image Upload:** Drag and drop or select an image to upload.
- **Cartoonify:** Convert your uploaded image into a cartoon using Stable Diffusion.
- **Live Preview:** See a preview of your uploaded image and the cartoonified result.
- **Responsive UI:** Clean, modern, and responsive interface built with Tailwind CSS and custom UI components.
- **API Integration:** Uses Replicate API for AI image processing and Vercel Blob for file storage.

## Demo

![Demo Screenshot](public/demo-screenshot.png) <!-- Add a screenshot if available -->

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun
- A [Replicate](https://replicate.com/) account and API key (for AI processing)
- A [Vercel](https://vercel.com/) project (for Blob Storage, if deploying)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/group-app.git
   cd group-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your Replicate API key:
   ```
   REPLICATE_API_KEY=your_replicate_api_key
   ```

   If using Vercel Blob, ensure your project is linked to Vercel.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

1. **Upload an Image:** Click the upload area or drag and drop an image (PNG, JPG, JPEG).
2. **Convert:** Click "Convert to Cartoon" to process your image.
3. **View Result:** The cartoonified image will appear on the right.

## Project Structure

```
.
├── app/
│   ├── page.tsx           # Main page logic (upload, process, display)
│   ├── layout.tsx         # App layout
│   └── api/
│       ├── upload/        # Image upload API (Vercel Blob)
│       └── cartoonify/    # Cartoonify API (Replicate/Stable Diffusion)
├── components/
│   ├── upload.tsx         # Upload component
│   └── ui/                # Reusable UI components (card, button, input)
├── lib/
│   └── utils.ts           # Utility functions (e.g., className merging)
├── public/
│   └── favicon.ico        # App icon
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## API Endpoints

### `POST /api/upload`

- Accepts: `multipart/form-data` with a `file` field.
- Uploads the image to Vercel Blob Storage and returns a public URL.

### `POST /api/cartoonify`

- Accepts: JSON `{ imageUrl: string }`
- Processes the image using Replicate's Stable Diffusion model and returns the cartoonified image URL.

## Custom UI Components

- **Card, Button, Input:** Located in `components/ui/`, these are reusable, styled components for consistent UI.
- **Upload:** Located in `components/upload.tsx`, handles file selection and preview.

## Technologies Used

- [Next.js](https://nextjs.org/) (App Router, API routes)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Replicate API](https://replicate.com/) (Stable Diffusion)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [TypeScript](https://www.typescriptlang.org/)

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

## License

[MIT](LICENSE) – Feel free to use, modify, and distribute.

---

Let me know if you want to add a section (e.g., FAQ, Troubleshooting, Credits) or need a badge, screenshot, or more deployment instructions!
