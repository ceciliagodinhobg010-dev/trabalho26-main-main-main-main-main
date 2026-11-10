import express from 'express';
import multer from 'multer';

import MaterialController from '../controllers/MaterialController.js';

const router = express.Router();
const controle = new MaterialController();
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },

    filename: (req, file, cb) => {

        const nomeArquivo =
            Date.now() +
            '-' +
            file.originalname.replace(/\s+/g, '-');

        cb(null, nomeArquivo);

    }

});

const upload = multer({
    storage: storage
});
const caminhobase = 'materiais/';

router.get(
    '/' + caminhobase + 'add',controle.openAdd
);

router.post(
    '/' + caminhobase + 'add',
    upload.fields([
        { name: 'arquivo', maxCount: 1 },
        { name: 'capa', maxCount: 1 }
    ]),
    controle.add
);

router.get(
    '/materiais',controle.home
);

router.get(
    '/' + caminhobase + 'lst',controle.list
);

router.post(
    '/' + caminhobase + 'lst',controle.find
);

router.get(
    '/' + caminhobase + 'del/:id',controle.del
);

router.get(
    '/' + caminhobase + 'edt/:id',controle.openEdt
);

router.post(
    '/' + caminhobase + 'edt/:id',
    upload.fields([
        { name: 'arquivo', maxCount: 1 },
        { name: 'capa', maxCount: 1 }
    ]),
    controle.edt
);

router.get(
    '/materiais/capa/:id',controle.capa
);

export default router;