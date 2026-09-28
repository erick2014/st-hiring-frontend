import { EventsPage } from '../pages/EventsPage';
import { SettingsPage } from '../pages/SettingsPage';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <SettingsPage />
      <EventsPage />
    </div>
  );
}
