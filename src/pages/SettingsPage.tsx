import { useState } from 'react';
import { GearIcon } from "../shared/components/GearIcon/GearIcon";
import { SettingsModal } from "../features/settings/components/SettingsModal";

export function SettingsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div style={{padding:'10px 15px 0 0' }}>
        <GearIcon
          width={30}
          height={30}
          color="white"
          cursor="pointer"
          onClick={() => setModalOpen(true)}
        />
      </div>
      <SettingsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
