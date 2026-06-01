'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'W1', hours: 2.5 },
  { name: 'W2', hours: 5.8 },
  { name: 'W3', hours: 5.9 },
  { name: 'W4', hours: 7.2 },
]

export default function LearningVelocity() {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | 'ALL'>('30D')

  return (
    <article className="bg-[#0f0f12] rounded-2xl p-6 border border-white/5 flex flex-col h-full min-h-[350px]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold text-white uppercase tracking-wider">Learning Speed</h2>
        <div className="flex bg-white/5 rounded-lg p-1">
          {(['7D', '30D', 'ALL'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                timeframe === t
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
            
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
              dy={10}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
              tickFormatter={(val) => `${val}h`}
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1f',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#22d3ee' }}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
              formatter={(value: any) => [`${value} hours`, 'Logged']}
              labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}
            />

            <Line
              type="monotone"
              dataKey="hours"
              stroke="#22d3ee"   
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, fill: '#22d3ee', stroke: '#0f0f12', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
