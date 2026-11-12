import expenseScreenshot from '../assets/moi-raskhody-demo.jpg'

export type Project = {
  id: string
  title: string
  kind: string
  description: string
  features: readonly string[]
  technologies: readonly string[]
  demoUrl: string
  repositoryUrl?: string
  screenshot: {
    src: string
    alt: string
    caption: string
    width: number
    height: number
  }
}

export const projects: readonly Project[] = [
  {
    id: 'moi-raskhody',
    title: 'Мои расходы',
    kind: 'Учебный проект',
    description: 'Веб-приложение для учёта личных расходов, управления записями и анализа трат',
    features: [
      'Добавление и редактирование расходов',
      'Категории и фильтрация',
      'Статистика и отчёты по категориям',
      'Экспорт CSV',
      'Резервное копирование и восстановление JSON',
      'Сохранение данных в браузере',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
    demoUrl: 'https://tkachenko-petr.github.io/moi-raskhody-demo/?demo=1',
    screenshot: {
      src: expenseScreenshot,
      alt: 'Интерфейс «Мои расходы» с итогами и диаграммой расходов по категориям',
      caption: 'Снимок приложения с демонстрационными данными',
      width: 1105,
      height: 750,
    },
  },
]
