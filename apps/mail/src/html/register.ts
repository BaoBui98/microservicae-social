export const getRegisterEmailTemplate = (email: string): string => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to our Social App</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
    }
    .header {
      background: linear-gradient(135deg, #6366f1, #a855f7);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px 32px;
      color: #334155;
    }
    .content p {
      font-size: 16px;
      line-height: 1.625;
      margin-top: 0;
      margin-bottom: 24px;
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      padding: 14px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      transition: all 0.2s ease;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px;
      text-align: center;
      font-size: 13px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #6366f1;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Social App</h1>
    </div>
    <div class="content">
      <p>Xin chào,</p>
      <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>Social App</strong>. Hãy bấm vào nút bên dưới để xác thực địa chỉ email của bạn:</p>
      
      <div class="button-container">
        <a href="#" class="btn">Xác thực tài khoản</a>
      </div>

      <p>Nếu bạn không thực hiện yêu cầu này, bạn có thể bỏ qua email này.</p>
      <p>Trân trọng,<br>Đội ngũ Social App</p>
    </div>
    <div class="footer">
      <p>Email này được gửi tự động tới <a href="mailto:${email}">${email}</a>.</p>
      <p>&copy; 2026 Social App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};
