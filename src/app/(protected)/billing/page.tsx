'use client'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { createCheckoutSession } from '@/lib/stripe'
import { api } from '@/trpc/react'
import { CreditCard, Info, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const Billing = () => {
  const { data: user } = api.project.getUserCredits.useQuery()
  const [creditsToBuy, setCreditsToBuy] = useState<number[]>([100])
  const creditsToBuyAmount = creditsToBuy[0]!
  const price = (creditsToBuyAmount / 50).toFixed(2)

  return (
    <div className="grid animate-fadeIn grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Purchase Credits
            </CardTitle>
            <CardDescription>
              Buy credits to index more repositories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-blue-800/40 bg-blue-950/40 px-6 py-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 text-blue-400" />
                <div className="space-y-1">
                  <p className="text-sm text-blue-100">
                    Each credit allows you to index 1 file in a repository.
                  </p>
                  <p className="text-sm text-blue-300">
                    Example: If your project has 100 files, you'll need 100
                    credits to index them.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">
                      Select amount
                    </p>
                    <div className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1">
                      <p className="text-sm font-medium text-blue-400">
                        {creditsToBuyAmount} credits
                      </p>
                    </div>
                  </div>
                  <div className="px-3 color-white">
                    <Slider
                      defaultValue={[100]}
                      max={1000}
                      min={10}
                      step={10}
                      onValueChange={value => setCreditsToBuy(value)}
                      value={creditsToBuy}
                      className={cn(
                        'relative flex w-full touch-none select-none items-center py-1.5'
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm text-blue-300">10 credits</span>
                  <span className="text-sm text-blue-300">1000 credits</span>
                </div>
              </div>

              <Button
                onClick={() => createCheckoutSession(creditsToBuyAmount)}
                className="w-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white hover:opacity-90"
                size="lg"
              >
                Buy {creditsToBuyAmount} credits for ${price}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white shadow-lg">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex-shrink-0 rounded-full bg-white/10 p-2">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <CardDescription className="text-white/70">
                Available Credits
              </CardDescription>
              <p className="text-2xl font-semibold text-white">
                {user?.credits || 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Billing