const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validar força da senha (mínimo 6 caracteres)
function validarSenha(senha) {
  return senha && senha.length >= 6;
}

exports.cadastro = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Validações
    if (!nome || !email || !senha) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ msg: "E-mail inválido." });
    }

    if (!validarSenha(senha)) {
      return res
        .status(400)
        .json({ msg: "Senha deve ter no mínimo 6 caracteres." });
    }

    // Verificar se email já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "E-mail já cadastrado." });
    }

    const hash = await bcrypt.hash(senha, 10);

    const user = new User({
      nome,
      email,
      senha: hash,
    });

    await user.save();

    res.json({ msg: "Usuário criado com sucesso.", user });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erro ao cadastrar usuário.", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ msg: "E-mail e senha são obrigatórios." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    const valid = await bcrypt.compare(senha, user.senha);

    if (!valid) {
      return res.status(401).json({ msg: "Senha inválida." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao fazer login.", error: err.message });
  }
};
