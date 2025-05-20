function authorizeRole(role) {
    return (req, res, next) => {
      if (req.user?.role === role) {
        return next();
      }
      return res.status(403).json({ error: 'Acesso negado' });
    };
  }
  
  module.exports = authorizeRole;
  