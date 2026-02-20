// src/constants/theme.js

export const COLORS = {
  primary: '#D4AF37', // Gold - Solenne, prezioso
  background: '#FFFFF0', // Ivory - Bianco avorio, pulito
  accent: '#800020', // Bordeaux - Liturgico, elegante
  text: '#2C2C2C', // Dark Charcoal - Leggibilità con morbidezza
  textLight: '#FFFFFF',
  secondaryText: '#5A5A5A',
  border: '#E0E0E0',
  success: '#4CAF50',
  error: '#F44336',
  white: '#FFFFFF',
};

export const FONTS = {
  // In a real app, we would load custom fonts like "Playfair Display" or "Crimson Text" for a more religious/classic feel.
  // Here we use system fonts that approximate that look.
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 10,
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
};

export const SHADOWS = {
  light: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
};

export const COMMON_STYLES = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    ...SHADOWS.light,
  },
};

export default {
  COLORS,
  FONTS,
  SHADOWS,
  COMMON_STYLES,
};
