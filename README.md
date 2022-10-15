# Japerydo

Questions are written into `questions.json` in the format:

`
[
    {
        "category": "Category 1",
        "questions": [
            {
                "points": 200,
                "prompt": "Question 1",
                "choices": [
                    "A. First Choice",
                    "B. Second Choice",
                    "C. Third Choice",
                    "D. Fourth Choice"
                ],
                "answer": "First Choice",
                "image": null
            },
            {
                "points": 400,
                "prompt": "Question 2",
                "choices": null,
                "answer": "First Choice",
                "image": "/pathToImage.jpg"
            },
            ...
        ]
    },
    ...
]
`