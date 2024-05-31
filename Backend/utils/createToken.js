import jwt from 'jsonwebtoken';

const createToken = (res, userId, secretKey) => {
  try {
    if (!secretKey) {
      throw new Error("Secret key is missing in createToken function");
    }

    const token = jwt.sign({ userId }, secretKey, { expiresIn: "30d" });

    // Set JWT as HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.error("Error creating token:", error.message);
    throw error;
  }
};

export default createToken;

