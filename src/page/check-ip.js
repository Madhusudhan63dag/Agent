export default function handler(req, res) {
    const allowedIP = '123.123.123.123'; // replace with your allowed IP
  
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  
    if (ip === allowedIP) {
      return res.status(200).json({ allowed: true });
    } else {
      return res.status(403).json({ allowed: false });
    }
  }
  