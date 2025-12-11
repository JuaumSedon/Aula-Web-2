// --- middlewares/isAuth.js ---

const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// A chave secreta usada para assinar e verificar os tokens.
// **IMPORTANTE:** Em produção, você DEVE obter isso de uma variável de ambiente (ex: process.env.JWT_SECRET).

const isAuth = (req, res, next) => {
    // 1. Extrair o cabeçalho de autorização
    // Esperamos o formato: Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];
    
    // Se não houver cabeçalho, ou se ele não começar com 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            status: 'error',
            code: 401,
            message: 'Não autorizado. Token não fornecido ou formato inválido.' 
        });
    }

    // 2. Separar e obter o token
    const token = authHeader.split(' ')[1]; 
    
    // 3. Verificar o token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Token inválido (assinatura errada, expirado, etc.)
            console.error("[isAuth Middleware] Erro na verificação do token:", err.message);
            return res.status(403).json({ 
                status: 'error',
                code: 403,
                message: 'Acesso negado. Token inválido ou expirado.' 
            });
        }
        
        // 4. Token Válido: Anexar os dados do usuário à requisição
        // 'decoded' contém o payload do token (ex: { id: 1, email: "teste@mail.com" })
        req.user = decoded; 
        
        // 5. Chamar 'next()' para permitir que a requisição prossiga para o Controller
        next();
    });
};

module.exports = isAuth;