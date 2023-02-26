const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // тут можно поменять папку, в которую будут вкладываться файлы. Важно. Папка должна быть создана в ручную!!!
        cb(null, './assets/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname.match(/\..+$/g).at(-1);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})

const upload = multer({storage});

router.get('/IsUserExists', (req, res, next) => {
    const login = req.query.login;
    console.log(login);
    //find if exists
    res.send({ IsExists: true });
});

router.get('/UserProfiles', (req, res, next) => {
    const login = req.query.login;
    console.log(login);
    //check if user is doctor or patient
    res.send({ IsDoctor: true, IsPatient: false });
});

router.get('/Patient', (req, res, next) => {
    const patientId = req.query.patientId;
    console.log(patientId);
    //check if user is doctor or patient
    res.send(
        {
            id: "1",
            name: "Heisenberg",
            doctor: "2",
            quiz: [
                {
                    questionId: "1",
                    answersType: "numeric",
                    text: "some text"

                },
                {
                    questionId: "2",
                    answersType: "numeric",
                    text: "some text"

                }
            ],
            quiz_results: [
                {
                    id: "1",
                    date: new Date(),
                    result: [
                        {
                            questionId: "1",
                            answer: 12
                        },
                        {
                            questionId: "2",
                            answer: 13
                        },
                    ]
                }

            ],
            recommendations: [
                {
                    id: "1",
                    date: new Date().toISOString(),
                    text: "some text"
                },
                {
                    id: "2",
                    date: new Date().toISOString(),
                    text: "some text"
                }
            ]
        }
    );
});

router.post('/Patient/quiz', (req, res, next) => {
    const body = req.body;
    console.log(body)
    res.send({
        questionId: "new",
        answersType: body.quiz.answersType,
        text: body.quiz.text
    });
});

router.get('/Patient/quiz', (req, res, next) => {
    const body = req.query.patientId;
    console.log(body)
    res.send([{
        questionId: "new",
        answersType: 'numeric',
        text: 'Сколько лет'
    },
        {
            questionId: "ne21",
            answersType: 'logical',
            text: 'Тебе хорошо?'
        },
        {
            questionId: "ne2w",
            answersType: 'text',
            text: 'Что ты делаешь'
        },
        {
            questionId: "ne21ratiw",
            answersType: 'rating',
            text: 'Оцени себя'
        }]);
});

router.post('/Patient/recommendation', (req, res, next) => {
    const body = req.body;
    console.log(body)
    res.send({
        id: "new",
        date: new Date(),
        text: body.text
    });
})

router.post('/GetUser/', (req, res, next) => {
    const login = req.body.login;
    console.log(login);
    // const profile = req.query.profile;
    let result = {}
    if (login === 'patient')
        res.send({
            role: 'patient',
            name: 'Heisenberg',
            id: '1',
            doctors: [{id: '1', name: 'hi'}]
        });
    if (login === 'doctor') {
        res.send({
            role: 'doctor',
            name: 'doc',
            id: '2',
        })
    }
});

router.get('/Patient/recommendation', (req, res, next) => {
    const body = req.query.patientId;
    console.log(body)
    res.send([{
        id: "new",
        date: new Date(),
        text: 'Рекомендация'
    }]);
});

router.get('/Patient/unsignedMedia', (req, res, next) => {
    const patientId = req.query.patientId;
    res.send(['https://thumbs.dreamstime.com/b/panoramic-autumn-landscape-wooden-path-fall-nature-backgro-sunset-background-97979511.jpg']);
});

router.post('/Patient/answer', upload.any(), (req, res, next) => {
    const data = req.body;
   /* Тут находятся данные
   * в данной ручки следующий объект:
   * quizResult: QuizResult
   * */

    const files = req.files;
    /* Тут находятся массив всех загруженных файлов
   * Каждый элемент массива содержит следующее:
   * {
   * filename: string // Навряд ли понадобиться
   * originaname: string // оригинальное полное название файла
   * encoding: string // Навряд ли понадобиться
   * mimetype: string // Навряд ли понадобиться
   * destination: string // путь, куда сохранился файл(сейчас стоит ./assets/. Если надо, то выше можно поменять путь
   * filename: string // имя этого файла в папке destination
   * path: string // полный путь файла относительно текущей деректории
   * size: number // размер файла
   * }
   * */
    console.log(req.body, req.files);
    res.send(['https://thumbs.dreamstime.com/b/panoramic-autumn-landscape-wooden-path-fall-nature-backgro-sunset-background-97979511.jpg']);
})

module.exports = router;