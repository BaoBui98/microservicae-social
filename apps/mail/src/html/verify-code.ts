export const getVerifyCodeEmailTemplate = (email: string, code: string): string => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
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
      background: linear-gradient(135deg, #0ea5e9, #2563eb);
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
    .code-box {
      text-align: center;
      background-color: #f1f5f9;
      border: 2px dashed #cbd5e1;
      border-radius: 12px;
      padding: 20px;
      margin: 32px 0;
    }
    .code {
      font-size: 36px;
      font-weight: 800;
      letter-spacing: 6px;
      color: #1e3a8a;
      margin: 0;
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
      color: #2563eb;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Social App Verification</h1>
    </div>
    <div class="content">
      <p>Xin chào,</p>
      <p>Bạn vừa yêu cầu mã xác thực địa chỉ email. Vui lòng nhập mã OTP gồm 6 chữ số dưới đây để hoàn tất quá trình xác minh:</p>
      
      <div class="code-box">
        <p class="code">${code}</p>
      </div>

      <p><strong>Lưu ý:</strong> Mã xác thực này có hiệu lực trong vòng 5 phút. Vui lòng không chia sẻ mã này với bất kỳ ai để bảo vệ tài khoản của bạn.</p>
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
