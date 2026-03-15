import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Начинаем заполнение базы данных...')
  
  // 1. Растения
  await prisma.plant.createMany({
    data: [
      { name: 'Монстера', light: 'bright', watering: 'moderate', humidity: 'high', description: 'Крупное растение с резными листьями' },
      { name: 'Сансевиерия', light: 'bright', watering: 'rare', humidity: 'low', description: 'Щучий хвост' },
      { name: 'Фикус Бенджамина', light: 'bright', watering: 'moderate', humidity: 'medium', description: 'Популярное деревце' },
      { name: 'Замиокулькас', light: 'partial', watering: 'rare', humidity: 'low', description: 'Долларовое дерево' },
      { name: 'Спатифиллум', light: 'partial', watering: 'moderate', humidity: 'high', description: 'Женское счастье' },
      { name: 'Орхидея', light: 'bright', watering: 'rare', humidity: 'high', description: 'Фаленопсис' },
      { name: 'Кактус', light: 'direct', watering: 'very_rare', humidity: 'low', description: 'Кактус' },
      { name: 'Драцена', light: 'bright', watering: 'moderate', humidity: 'medium', description: 'Пальмочка' },
      { name: 'Хлорофитум', light: 'partial', watering: 'moderate', humidity: 'medium', description: 'Паучок' },
      { name: 'Толстянка', light: 'bright', watering: 'rare', humidity: 'low', description: 'Денежное дерево' },
    ]
  })
  console.log('✅ Растения добавлены')

  // 2. Симптомы
  await prisma.symptom.createMany({
    data: [
      { name: 'Желтеют листья', description: 'Листья теряют зеленый цвет' },
      { name: 'Сохнут кончики', description: 'Кончики листьев коричневые' },
      { name: 'Листья вянут', description: 'Листья потеряли упругость' },
      { name: 'Паутина на листьях', description: 'Видна тонкая паутинка' },
      { name: 'Коричневые пятна', description: 'Пятна на листьях' },
      { name: 'Белый налет', description: 'Похож на муку' },
      { name: 'Листья опадают', description: 'Растение теряет листья' },
      { name: 'Вытягиваются стебли', description: 'Стебли стали длинными' },
      { name: 'Липкие листья', description: 'Липкий слой на листьях' },
      { name: 'Чернеют стебли', description: 'Стебли темнеют' },
    ]
  })
  console.log('✅ Симптомы добавлены')

  // 3. Диагнозы
  await prisma.diagnosis.createMany({
    data: [
      { name: 'Перелив', description: 'Корни гниют от воды', treatment: 'Не поливать, пересадить' },
      { name: 'Недолив', description: 'Растение пересохло', treatment: 'Обильно полить' },
      { name: 'Паутинный клещ', description: 'Вредитель', treatment: 'Обработать акарицидом' },
      { name: 'Щитовка', description: 'Вредитель', treatment: 'Соскоблить, обработать' },
      { name: 'Недостаток света', description: 'Слишком темно', treatment: 'Переставить к свету' },
      { name: 'Сухой воздух', description: 'Низкая влажность', treatment: 'Опрыскивать' },
      { name: 'Мучнистая роса', description: 'Грибок', treatment: 'Обработать фунгицидом' },
      { name: 'Корневая гниль', description: 'Гниль корней', treatment: 'Пересадка, обрезка' },
      { name: 'Тля', description: 'Вредитель', treatment: 'Мыльный раствор' },
      { name: 'Переохлаждение', description: 'Холодно', treatment: 'Убрать со сквозняка' },
    ]
  })
  console.log('✅ Диагнозы добавлены')

  // 4. Получаем ID для создания правил
  const symptoms = await prisma.symptom.findMany()
  const diagnoses = await prisma.diagnosis.findMany()
  
  // Создаем словари для удобства
  const symptomMap = Object.fromEntries(symptoms.map(s => [s.name, s.id]))
  const diagnosisMap = Object.fromEntries(diagnoses.map(d => [d.name, d.id]))

  // 5. Правила (связи симптомов с диагнозами)
  await prisma.rule.createMany({
    data: [
      // Перелив
      { symptomId: symptomMap['Желтеют листья'], diagnosisId: diagnosisMap['Перелив'], weight: 8 },
      { symptomId: symptomMap['Листья вянут'], diagnosisId: diagnosisMap['Перелив'], weight: 7 },
      // Недолив
      { symptomId: symptomMap['Желтеют листья'], diagnosisId: diagnosisMap['Недолив'], weight: 6 },
      { symptomId: symptomMap['Листья вянут'], diagnosisId: diagnosisMap['Недолив'], weight: 8 },
      // Паутинный клещ
      { symptomId: symptomMap['Паутина на листьях'], diagnosisId: diagnosisMap['Паутинный клещ'], weight: 10 },
      { symptomId: symptomMap['Желтеют листья'], diagnosisId: diagnosisMap['Паутинный клещ'], weight: 5 },
      // Щитовка
      { symptomId: symptomMap['Липкие листья'], diagnosisId: diagnosisMap['Щитовка'], weight: 8 },
      // Недостаток света
      { symptomId: symptomMap['Вытягиваются стебли'], diagnosisId: diagnosisMap['Недостаток света'], weight: 9 },
      // Сухой воздух
      { symptomId: symptomMap['Сохнут кончики'], diagnosisId: diagnosisMap['Сухой воздух'], weight: 10 },
      // Мучнистая роса
      { symptomId: symptomMap['Белый налет'], diagnosisId: diagnosisMap['Мучнистая роса'], weight: 10 },
    ]
  })
  console.log('✅ Правила добавлены')
}

main()
  .catch(e => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })