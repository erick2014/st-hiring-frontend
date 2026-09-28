import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Snackbar,
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

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState<'success' | 'error'>('success');

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

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
      showSnackbar('Settings saved successfully', 'success');
      onClose();
    } catch {
      dispatch(setError('Failed to save settings'));
      showSnackbar('Failed to save settings', 'error');
    }
  };

  return (
    <>
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
          <Typography variant="h6" fontWeight="bold">App Settings</Typography>
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
                />
              )}
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackSeverity} variant="filled">
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
