// export default function handler(req, res) {
//     const allowedIPs = ['49.207.9.5'];
  
//     const getClientIP = (req) => {
//       const forwarded = req.headers['x-forwarded-for'];
//       const realIP = req.headers['x-real-ip'];
//       const cfConnectingIP = req.headers['cf-connecting-ip'];
  
//       if (forwarded) return forwarded.split(',')[0].trim();
//       if (realIP) return realIP;
//       if (cfConnectingIP) return cfConnectingIP;
  
//       return req.socket.remoteAddress || req.connection.remoteAddress;
//     };
  
//     const clientIP = getClientIP(req);
  
//     console.log('Client IP:', clientIP); // Keep for debugging
  
//     const isAllowed = allowedIPs.some(allowedIP => {
//       return clientIP === allowedIP || clientIP === `::ffff:${allowedIP}`;
//     });
  
//     if (isAllowed) {
//       return res.status(200).json({
//         allowed: true,
//         message: 'Access granted',
//         ip: clientIP
//       });
//     } else {
//       return res.status(403).json({
//         allowed: false,
//         message: 'Access denied - Unauthorized IP address',
//         ip: clientIP
//       });
//     }
//   }

export default function handler(req, res) {
  const allowedIPs = ['49.207.9.5'];

  const getClientIP = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const realIP = req.headers['x-real-ip'];
    const cfConnectingIP = req.headers['cf-connecting-ip'];

    console.log('Full headers:', req.headers); // ✅ Add this
    console.log('forwarded:', forwarded);
    console.log('realIP:', realIP);
    console.log('cfConnectingIP:', cfConnectingIP);
    console.log('remoteAddress:', req.socket.remoteAddress);

    if (forwarded) return forwarded.split(',')[0].trim();
    if (realIP) return realIP;
    if (cfConnectingIP) return cfConnectingIP;

    return req.socket.remoteAddress || req.connection.remoteAddress;
  };

  const clientIP = getClientIP(req);

  console.log('Client IP resolved:', clientIP);

  const isAllowed = allowedIPs.some(allowedIP =>
    clientIP === allowedIP || clientIP === `::ffff:${allowedIP}`
  );

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
