import { Component } from '@angular/core';

interface AnswerOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  questions = [
      {
        questionText: 'Welche Art von Blumen magst du am liebsten?',
        answerOptions: [
          { label: 'Rosen', value: 'A' },
          { label: 'Sonnenblumen', value: 'B' },
          { label: 'Orchideen', value: 'C' },
          { label: 'Tulpen', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie viel Platz hast du für Pflanzen in deinem Zuhause?',
        answerOptions: [
          { label: 'Ich habe nur wenig Platz für große Pflanzen', value: 'A' },
          { label: 'Ich habe viel Platz und könnte mehrere große Pflanzen unterbringen', value: 'B' },
          { label: 'Ich habe genug Platz, um viele Pflanzen zu haben, sogar größere Zimmerpflanzen', value: 'C' },
          { label: 'Ich habe ein Haus mit Garten und kann eine Vielzahl von Pflanzen halten', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie viel Zeit bist du bereit, täglich in die Pflege deiner Pflanzen zu investieren?',
        answerOptions: [
          { label: 'Weniger als 30 Minuten', value: 'A' },
          { label: '30 Minuten bis 1 Stunde', value: 'B' },
          { label: '1-2 Stunden', value: 'C' },
          { label: 'Mehr als 2 Stunden', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie wichtig ist es dir, dass deine Pflanzen robust und pflegeleicht sind?',
        answerOptions: [
          { label: 'Sehr wichtig, da ich wenig Erfahrung mit Pflanzen habe', value: 'A' },
          { label: 'Wichtig, aber ich bin bereit, etwas Zeit in die Pflege zu investieren', value: 'B' },
          { label: 'Nicht so wichtig, da ich gerne anspruchsvollere Pflanzen pflegen würde', value: 'C' },
          { label: 'Gar nicht wichtig, ich bin bereit, viel Zeit und Mühe in die Pflege zu investieren', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie viel Duft sollten deine Pflanzen haben?',
        answerOptions: [
          { label: 'Möglichst duftlos', value: 'A' },
          { label: 'Ein leichter Duft ist okay', value: 'B' },
          { label: 'Ich mag Pflanzen mit einem starken Duft', value: 'C' },
          { label: 'Der Duft ist mir egal, solange die Pflanze schön ist', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie wichtig ist es dir, dass deine Pflanzen farbenfroh sind?',
        answerOptions: [
          { label: 'Überhaupt nicht wichtig', value: 'A' },
          { label: 'Ein wenig Farbe wäre schön', value: 'B' },
          { label: 'Es ist mir wichtig, dass meine Pflanzen auffällig und bunt sind', value: 'C' },
          { label: 'Mir ist die Farbe meiner Pflanzen sehr wichtig', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie wichtig ist es dir, dass deine Pflanzen gut in deinem Interieur aussehen?',
        answerOptions: [
          { label: 'Überhaupt nicht wichtig', value: 'A' },
          { label: 'Ein wenig wichtig, aber sie müssen nicht perfekt passen', value: 'B' },
          { label: 'Es ist mir wichtig, dass meine Pflanzen gut zum Stil meines Hauses passen', value: 'C' },
          { label: 'Sehr wichtig, ich möchte, dass meine Pflanzen mein Zuhause verschönern', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie viel möchtest du für deine Pflanzen ausgeben?',
        answerOptions: [
          { label: 'Ich suche nach preiswerten Optionen', value: 'A' },
          { label: 'Ich bin bereit, für schöne Pflanzen etwas mehr zu zahlen', value: 'B' },
          { label: 'Geld spielt keine Rolle, ich möchte nur die besten Pflanzen', value: 'C' },
          { label: 'Ich investiere gerne in seltene oder exotische Pflanzen', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie wichtig ist es dir, dass deine Pflanzen pflegeleicht sind?',
        answerOptions: [
          { label: 'Sehr wichtig, ich habe nicht viel Zeit für die Pflege', value: 'A' },
          { label: 'Ein wenig wichtig, aber ich bin bereit, Zeit für die Pflege zu investieren', value: 'B' },
          { label: 'Nicht so wichtig, ich habe Spaß an der Pflege anspruchsvoller Pflanzen', value: 'C' },
          { label: 'Gar nicht wichtig, ich investiere viel Zeit in die Pflege meiner Pflanzen', value: 'D' }
        ] as AnswerOption[]
      },
      {
        questionText: 'Wie wichtig ist es dir, dass deine Pflanzen luftreinigende Eigenschaften haben?',
        answerOptions: [
          { label: 'Überhaupt nicht wichtig', value: 'A' },
          { label: 'Ein wenig wichtig, aber nicht entscheidend', value: 'B' },
          { label: 'Es ist mir wichtig, dass meine Pflanzen die Luft in meinem Zuhause reinigen', value: 'C' },
          { label: 'Sehr wichtig, ich suche gezielt nach luftreinigenden Pflanzen', value: 'D' }
        ] as AnswerOption[]
      }
    ];
    
  currentQuestionIndex = 0;
  currentQuestion: any;
  selectedAnswers: any = {};
  quizResult: string | null = null;
  answerCounts: { [key: string]: number } = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  };

  ngOnInit() {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  selectAnswer(answer: string) {
    this.selectedAnswers[this.currentQuestionIndex] = answer;
  }
  
  evaluateAnswers() {
    for (let i = 0; i < this.questions.length; i++) {
      const selectedAnswer = this.selectedAnswers[i];
  
      if (selectedAnswer) {
        const answer = selectedAnswer as string;
        this.answerCounts[answer]++;
      }
    }
  
    let maxCount = 0;
    let maxAnswer = '';
  
    for (const [key, value] of Object.entries(this.answerCounts)) {
      if (value > maxCount) {
        maxCount = value;
        maxAnswer = key;
      }
    }

      switch (maxAnswer) {
        case 'A':
          this.quizResult = 'Herzlichen Glückwunsch! Die Ergebnisse deuten darauf hin, dass du am besten zu Zimmerpflanzen passt. Zimmerpflanzen sind ideal für Menschen mit wenig Platz, die dennoch die Schönheit und Frische von Pflanzen in ihrem Zuhause genießen möchten. Sie sind pflegeleicht und können sowohl eine beruhigende Atmosphäre als auch ästhetischen Wert bieten. Mit den richtigen Pflanzen kannst du dein Zuhause in eine grüne Oase verwandeln.';
        break;
        case 'B':
          this.quizResult = 'Herzlichen Glückwunsch! Die Ergebnisse deuten darauf hin, dass du am besten zu Sonnenblumen passt. Sonnenblumen sind lebhaft und sonnig, perfekt für Menschen, die Freude an hellen und lebendigen Blumen haben. Sie sind relativ pflegeleicht und können einen Hauch von Sommer und Freude in jeden Raum bringen.';
        break;
        case 'C':
          this.quizResult = 'Herzlichen Glückwunsch! Die Ergebnisse deuten darauf hin, dass du am besten zu Orchideen passt. Orchideen sind elegant und anspruchsvoll, ideal für Menschen, die Freude an exotischen und eleganten Blumen haben. Sie erfordern etwas mehr Aufmerksamkeit, belohnen dich aber mit atemberaubender Schönheit.';
        break;
        case 'D':
          this.quizResult = 'Herzlichen Glückwunsch! Die Ergebnisse deuten darauf hin, dass du am besten zu Tulpen passt. Tulpen sind vielseitig und farbenfroh, perfekt für Menschen, die eine breite Palette an Farben und Formen in ihrem Garten oder Zuhause schätzen. Sie sind relativ pflegeleicht und bieten eine wunderschöne Frühlingslandschaft.';
        break;
        default:
          this.quizResult = 'Es tut uns leid, wir konnten kein Ergebnis für dich finden. Bitte versuche es erneut.';
    }
  }
}

