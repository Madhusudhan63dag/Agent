export default function handler(req, res) {
    // Add multiple allowed IPs if needed
    const allowedIPs = [
      '192.168.1.41', // Replace with your actual allowed IP
      'fe80::6ae4:eef7:ed68:41f8%9', // localhost IPv6
    ];
  
    // Get client IP from various possible headers
    const getClientIP = (req) => {
      const forwarded = req.headers['x-forwarded-for'];
      const realIP = req.headers['x-real-ip'];
      const cfConnectingIP = req.headers['cf-connecting-ip'];
      
      if (forwarded) {
        return forwarded.split(',')[0].trim();
      }
      
      if (realIP) {
        return realIP;
      }
      
      if (cfConnectingIP) {
        return cfConnectingIP;
      }
      
      return req.socket.remoteAddress || req.connection.remoteAddress;
    };
  
    const clientIP = getClientIP(req);
    
    console.log('Client IP:', clientIP); // For debugging - remove in production
    
    // Check if the client IP is in the allowed list
    const isAllowed = allowedIPs.some(allowedIP => {
      // Handle IPv4 mapped IPv6 addresses
      if (clientIP === `::ffff:${allowedIP}`) return true;
      if (clientIP === allowedIP) return true;
      return false;
    });
  
    if (isAllowed) {
      return res.status(200).json({ 
        allowed: true, 
        message: 'Access granted',
        ip: clientIP 
      });
    } else {
      return res.status(403).json({ 
        allowed: false, 
        message: 'Access denied - Unauthorized IP address',
        ip: clientIP 
      });
    }
  }
