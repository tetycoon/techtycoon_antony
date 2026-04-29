# Course Registration Website

A modern, responsive website for course registration with payment integration and email notifications.

## Features

- Modern React with TypeScript
- Responsive design with Tailwind CSS
- Payment integration with Razorpay
- Email notifications with EmailJS
- Form validation with React Hook Form and Zod
- Smooth animations with Framer Motion
- Accessible UI components with Radix UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Development

To start the development server:
```bash
npm start
```

## Building for Production

To create a production build:
```bash
npm run build
```

## Deployment to Vercel

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Environment Variables

The following environment variables are required:

- `REACT_APP_EMAILJS_PUBLIC_KEY`: Your EmailJS public key
- `REACT_APP_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `REACT_APP_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
- `REACT_APP_RAZORPAY_KEY_ID`: Your Razorpay key ID

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── config/         # Configuration files
├── interfaces/     # TypeScript interfaces
├── lib/           # Utility libraries
├── pages/         # Page components
├── services/      # API services
├── types/         # TypeScript types
├── utils/         # Utility functions
├── App.tsx        # Main App component
└── index.tsx      # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
