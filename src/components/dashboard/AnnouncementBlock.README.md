# AnnouncementBlock Component

A comprehensive announcement feed component with support for active/expired items, pagination, and full accessibility.

## Features

### ✅ Active + Expired Announcements
- **Active announcements** shown first with full color and interactivity
- **Expired announcements** shown after active ones with:
  - 60% opacity for ghosted appearance
  - Grayscale filter on avatar
  - "Expired" badge with clock icon
  - Muted text colors
  - Still fully accessible and clickable

### ✅ Pagination Support
- Displays up to 4 announcements per page (configurable via `maxVisible` prop)
- Smooth pagination controls at bottom
- Shows current page and total pages
- Previous/Next buttons with disabled states
- Supports more than 4 entries without performance issues

### ✅ Click to Open Details
- Entire announcement card is clickable
- Calls `onOpen(announcementId)` prop when clicked
- Arrow icon appears on hover for visual affordance
- Smooth hover animations and scale effects

### ✅ Mark as Read Action
- Check button appears on hover (top-right corner)
- Marks announcement as read
- Removes from scrolling view with smooth exit animation
- Calls `onMarkAsRead(announcementId)` prop
- Only available for non-expired announcements

### ✅ Always Visible Content
- If no active announcements exist, shows placeholder card:
  - Large megaphone icon
  - "No Active Announcements" message
  - "View All" button to access full list
  - Encourages user to check archived items

### ✅ View All Controls
- **Icon button** (List icon) in header - opens full list view
- **Footer button** - "View All Announcements" with arrow
- Both call `onViewAll()` prop
- Accessible with proper ARIA labels

### ✅ Keyboard + Screen Reader Accessible
- All interactive elements are focusable
- Proper focus indicators (ring-2 ring-accent)
- ARIA labels on all buttons
- Semantic HTML structure
- Keyboard navigation:
  - Tab to navigate between announcements
  - Enter/Space to open announcement
  - Tab to Mark as Read button
  - Enter to mark as read

### ✅ Smooth Animations
- Subtle fade-in on mount (0.2s)
- Smooth exit animation when marked as read
- Scale effect on hover (1.01x)
- Arrow icon fade-in on hover
- Mark as Read button scale animation
- No aggressive motion (respects reduced motion preferences)

## Props

```typescript
interface AnnouncementBlockProps {
  onOpen?: (announcementId: number) => void;
  onMarkAsRead?: (announcementId: number) => void;
  onViewAll?: () => void;
  maxVisible?: number; // Default: 4
}
```

## Usage

### Basic Usage
```tsx
<AnnouncementBlock />
```

### With Custom Handlers
```tsx
<AnnouncementBlock
  onOpen={(id) => navigate(`/announcements/${id}`)}
  onMarkAsRead={(id) => markAnnouncementAsRead(id)}
  onViewAll={() => navigate('/announcements')}
  maxVisible={5}
/>
```

### Integration Example
```tsx
import AnnouncementBlock from "@/components/dashboard/AnnouncementBlock";

function Dashboard() {
  const handleOpenAnnouncement = (id: number) => {
    // Navigate to detail page
    navigate(`/announcements/${id}`);
  };

  const handleMarkAsRead = async (id: number) => {
    // API call to mark as read
    await api.markAnnouncementAsRead(id);
    // Optionally refresh data
    refetchAnnouncements();
  };

  const handleViewAll = () => {
    // Navigate to full list
    navigate('/announcements');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnnouncementBlock
        onOpen={handleOpenAnnouncement}
        onMarkAsRead={handleMarkAsRead}
        onViewAll={handleViewAll}
        maxVisible={4}
      />
    </div>
  );
}
```

## Data Structure

```typescript
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  isNew: boolean;      // Shows "NEW" badge
  isExpired: boolean;  // Ghosted appearance
  isRead: boolean;     // Hidden from view
  color: string;       // Avatar background color
}
```

## Visual States

### Active Announcement
- Full color and opacity
- Hover effects enabled
- "NEW" badge if `isNew: true`
- Mark as Read button on hover
- Arrow icon on hover

### Expired Announcement
- 60% opacity
- Grayscale avatar
- "Expired" badge with clock icon
- Muted text colors
- No Mark as Read button
- Still clickable and accessible

### Read Announcement
- Removed from view with smooth animation
- Not displayed in the feed
- Available in full list view (via View All)

## Accessibility Features

### ARIA Labels
```tsx
// Announcement button
aria-label="New Office Policy. New announcement. Click to view details."

// Expired announcement
aria-label="Benefits Enrollment Deadline. Expired. Click to view details."

// Mark as Read button
aria-label="Mark New Office Policy as read"

// View All icon button
aria-label="View all announcements in full list"

// Pagination buttons
aria-label="Previous page"
aria-label="Next page"
```

### Focus Management
- Visible focus rings on all interactive elements
- Focus offset for better visibility
- Tab order follows visual order
- Focus trapped within component

### Screen Reader Support
- Semantic HTML (button, div with role)
- Descriptive labels for all actions
- Status announcements for state changes
- Proper heading hierarchy

## Styling

### Theme Integration
- Uses CSS variables for colors
- Adapts to light/dark mode
- Gradient background (blue to indigo)
- Consistent with design system

### Responsive Design
- Padding adjusts for mobile (p-4) and desktop (p-5)
- Text sizes scale appropriately
- Icon button hidden on mobile (header)
- Scrollable content area

### Color System
```tsx
// Avatar colors (customizable per announcement)
bg-rose-400    // HR/Policy
bg-emerald-400 // Admin
bg-sky-400     // IT
bg-purple-400  // Leadership
bg-amber-400   // Benefits
bg-teal-400    // Facilities
```

## Animation Details

### Entry Animation
```tsx
initial={{ opacity: 0, y: 6 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.2, ease: "easeOut" }}
```

### Exit Animation (Mark as Read)
```tsx
exit={{ opacity: 0, x: -20, height: 0 }}
transition={{ duration: 0.2, ease: "easeOut" }}
```

### Hover Effects
```tsx
// Card scale
whileHover={{ scale: 1.01 }}

// Avatar scale
isHovered && "scale-110"

// Arrow fade-in
animate={{ opacity: isHovered ? 1 : 0 }}
```

## Performance

### Virtualized Scrolling
- Only renders visible announcements
- Pagination prevents DOM bloat
- Smooth scrolling with `overflow-y-auto`
- Thin scrollbar styling

### Optimizations
- AnimatePresence for smooth list updates
- Memoized components (can be added)
- Efficient state updates
- No unnecessary re-renders

## Customization

### Change Max Visible Items
```tsx
<AnnouncementBlock maxVisible={6} />
```

### Custom Colors
Modify the `initialAnnouncements` array:
```tsx
{
  id: 1,
  color: "bg-pink-400", // Custom color
  // ... other props
}
```

### Custom Styling
Override classes via className prop (if added):
```tsx
<AnnouncementBlock className="custom-styles" />
```

## Testing

### Manual Testing Checklist
- [ ] Active announcements display correctly
- [ ] Expired announcements are ghosted
- [ ] Click opens announcement (onOpen called)
- [ ] Mark as Read removes from view
- [ ] Pagination works correctly
- [ ] Placeholder shows when no announcements
- [ ] View All buttons work
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Animations are smooth
- [ ] Responsive on mobile/tablet/desktop

### Keyboard Testing
1. Tab to first announcement
2. Press Enter to open
3. Tab to Mark as Read button
4. Press Enter to mark as read
5. Tab through pagination
6. Tab to View All button

### Screen Reader Testing
1. Navigate with arrow keys
2. Verify announcement details are read
3. Verify button labels are clear
4. Verify state changes are announced

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers

## Dependencies

- React
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS
- ShadCN UI (Card, Button)

## Future Enhancements

- [ ] Real-time updates via WebSocket
- [ ] Filter by category/author
- [ ] Search functionality
- [ ] Sort options (date, priority)
- [ ] Bulk mark as read
- [ ] Notification badges
- [ ] Announcement categories
- [ ] Rich text content support
- [ ] Attachment support
- [ ] Comment/reaction system
