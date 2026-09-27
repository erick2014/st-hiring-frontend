import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings, saveSettings } from '../settingsApi';
import { setSettings, setLoading, setError } from '../settingsSlice';
import { selectSettings, selectSettingsLoading, selectSettingsError } from '../settingsSelectors';
import { SettingsForm } from './SettingsForm';
import { Settings } from '../types';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const loading = useSelector(selectSettingsLoading);
  const error = useSelector(selectSettingsError);

  useEffect(() => {
    if (open) {
      dispatch(setLoading(true));
      dispatch(setError(null));
      fetchSettings()
        .then((data) => {
          dispatch(setSettings(data));
        })
        .catch(() => {
          dispatch(setError('Failed to load settings'));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [open, dispatch]);

  const handleSave = async (data: Partial<Settings>) => {
    try {
      await saveSettings(data);
      dispatch(setSettings({ ...settings, ...data }));
      onClose();
    } catch {
      dispatch(setError('Failed to save settings'));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { minHeight: 300 },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">Configure Settings</Typography>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading 
          ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) 
          : (
              <SettingsForm
                initialSettings={settings}
                onSave={handleSave}
                isSaving={false}
              />
            ) 
        }
      </DialogContent>
    </Dialog>
  );
}
