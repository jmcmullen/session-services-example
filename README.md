# Session Services Example

A Next.js demonstration application showcasing the Session Services ticketing platform API and React Elements integration. This project serves as a reference implementation for developers building event ticketing experiences using the Session Services platform.

## Overview

This demo application demonstrates:

- Integration with the Session Services API for event management
- Implementation of the `@session-services/react-elements` ticketing widget
- Dynamic theming based on tenant configuration
- Location-based event discovery
- Responsive event browsing and detail pages
- Cursor-based pagination

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: Mantine v8
- **Icons**: Tabler Icons
- **Package Manager**: Bun
- **Linting/Formatting**: Biome
- **Session Services Integration**:
  - Session Services API for event data
  - `@session-services/react-elements` for ticketing widgets

## Prerequisites

- Node.js 18+ or Bun runtime
- A Session Services tenant ID (obtain from Session Services platform)
- Session Services API access

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jmcmullen/session-services-example
cd session-services-example
```

2. Install dependencies:

```bash
bun install
# or
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Session Services API endpoint (defaults to production)
NEXT_PUBLIC_API_URL=https://api.session.services

# Your Session Services tenant ID (required)
NEXT_PUBLIC_TENANT_ID=your_tenant_id_here

# Your application base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3020
```

## Development

Run the development server:

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3020](http://localhost:3020) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── events/[slug]/     # Event detail page with ticketing widget
│   ├── region/[slug]/     # Region-based event filtering
│   ├── thank-you/         # Post-purchase confirmation
│   └── page.tsx           # Home page with event grid
├── components/            # React components
│   ├── event-card.tsx    # Event card for grid display
│   ├── header.tsx        # Navigation header with regions
│   ├── ticket-widget.tsx # Session Services ticketing integration
│   └── theme-provider.tsx # Dynamic theming & dark mode
└── lib/                   # Core utilities
    ├── api.ts            # Session Services API client
    ├── types.ts          # TypeScript type definitions
    └── tenant-context.tsx # Tenant configuration context
```

## Key Features

### Session Services API Integration

The application integrates with the Session Services API through a simplified client (`src/lib/api.ts`):

```typescript
// Fetch all events with optional filtering
const { events, cursor } = await getEvents({
  query: "concert",
  latitude: -33.8944,
  longitude: 151.2252,
  radius: 20,
  limit: 20,
});

// Get a single event by ID or slug
const event = await getEvent("event-slug");

// Get tenant configuration with regions
const config = await getTenantConfig();
```

### API Endpoints Used

- `GET /events` - List and search events with cursor-based pagination
- `GET /events/{identifier}` - Get event by ID or slug
- `GET /tenant/config` - Fetch tenant configuration and regions

### Ticketing Widget Integration

The application uses `@session-services/react-elements` to embed the Session Services ticketing widget:

```tsx
import { SessionsTicketing } from "@session-services/react-elements";

<SessionsTicketing
  eventId={event.id}
  tenantId={TENANT_ID}
  returnUrl="/thank-you"
  theme={colorScheme} // "light" or "dark"
/>;
```

### Dynamic Theming

- Automatic dark/light mode with persistence
- Keyboard shortcut: `Cmd/Ctrl + J` to toggle theme
- Tenant-specific branding from API configuration
- Mantine UI components with custom pink theme

### Region-Based Discovery

Browse events by geographic regions configured in your tenant settings:

- Dynamic region pages (`/region/[slug]`)
- Location-based filtering using latitude/longitude/radius
- Support for different region types: `COUNTRY`, `STATE`, `CITY`, `VENUE`
- Hierarchical region navigation in header

## Type Definitions

The application includes comprehensive TypeScript types for the Session Services API:

```typescript
interface Event {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: EventStatus;
  visibility: EventVisibility;
  entryStartsAt: string;
  entryEndsAt: string;
  location: EventLocation;
  images: EventImages;
  // ... more fields
}

interface SearchEventsResponse {
  events: Event[];
  cursor?: string | null; // For pagination
  metadata?: {
    backend?: "dynamodb" | "elasticsearch";
  };
}
```

## Available Scripts

```bash
# Development server with Turbopack
bun dev

# Production build
bun run build

# Start production server
bun start

# Run linting
bun run lint

# Format code
bun run format
```

## Environment Variables

| Variable                | Description                     | Default                          |
| ----------------------- | ------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_API_URL`   | Session Services API endpoint   | `https://api.session.services`   |
| `NEXT_PUBLIC_TENANT_ID` | Your Session Services tenant ID | `ten_01hk153x00en6tvgwwwhn8xj1p` |
| `NEXT_PUBLIC_BASE_URL`  | Your application URL            | `http://localhost:3000`          |

## Features Demonstrated

- ✅ Event listing with responsive grid layout
- ✅ Event detail pages with comprehensive information
- ✅ Embedded Session Services ticketing widget
- ✅ Location-based event discovery
- ✅ Region-based filtering
- ✅ Cursor-based pagination
- ✅ Dark/light theme toggle
- ✅ TypeScript type safety
- ✅ Server-side rendering with caching
- ✅ Search and filtering capabilities
- ✅ Responsive mobile-first design
- ✅ Error handling with user-friendly messages

## Session Services API Documentation

For complete API documentation and additional features:

- [Session Services API Documentation](https://api.session.services/docs)
- [OpenAPI Specification](https://api.session.services/spec.json)

## Contributing

This is a demo application meant for learning and reference. Feel free to:

- Fork and modify for your own use
- Submit issues for bugs or improvements
- Share feedback with the Session Services team

## License

This demo application is provided as-is for educational and development purposes.

## Support

For questions about the Session Services platform:

- Documentation: https://session.services/docs
- API Reference: https://api.session.services/docs
- Support: support@session.services
