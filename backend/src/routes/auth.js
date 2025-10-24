import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuração da estratégia Google OAuth2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Google Profile:', profile);
    return done(null, profile);
  }
));

// Serialização e desserialização de usuário para sessões
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Rota para iniciar o fluxo de autenticação Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rota de callback após o Google autenticar o usuário
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Rota para logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Rota para verificar se o usuário está autenticado
router.get('/current_user', (req, res) => {
    res.send(req.user);
});

export default router;