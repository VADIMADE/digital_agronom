import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">
        Цифровой агроном
      </h1>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Экспертная система по уходу за домашними растениями
      </p>
      
      <div className="flex justify-center gap-4">
        <Link href="/plants" className="bg-green-600 text-white px-6 py-3 rounded-lg">
          Растения
        </Link>
        <Link href="/diagnose" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Диагностика
        </Link>
      </div>

      <div className="mt-16 text-center text-gray-500">
        <p>В базе данных: 10 растений, 10 симптомов, 10 диагнозов</p>
      </div>
    </div>
  )
}