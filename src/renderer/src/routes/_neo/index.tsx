import CreateConnection from '@renderer/components/custom/create-connection'
import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import waves from '@renderer/assets/simple-waves.svg'
import banner from '@renderer/assets/simple-banner.svg'

export const Route = createFileRoute('/_neo/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="w-full p-4 container ml-auto mr-auto flex gap-8 flex-col">
      <div className="w-full relative min-h-[300px]">
        <div className="w-full h-full absolute top-0 left-0 z-[10] p-4 flex flex-col gap-4 pt-8 px-16">
          <p className="text-white text-5xl">Welcome to Neo.</p>
          <p className="text-white text-xl max-w-[700px] italic">
            Neo is a modern solution for database-driven workflows, built around a simple
            “point-and-click” philosophy. Designed for both developers and clients, Neo makes
            complex tasks intuitive and accessible, empowering anyone to work with data
            effortlessly.
          </p>
        </div>
        <img
          src={banner}
          className="object-cover rounded-md w-full aspect-[16/4] h-full absolute top-0 left-0 z-[0] brightness-75"
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex gap-4 sm:flex-row flex-col">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Connect a Database</CardTitle>
              <CardDescription>Connect a Database to query it within Neo.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateConnection
                asChild
                trigger={
                  <Button className="cursor-pointer">
                    <Plus />
                    Add
                  </Button>
                }
              />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create a Project</CardTitle>
              <CardDescription>Easily organize database connections with Projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <Plus />
                Create
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="">
        <div className="w-full border rounded-lg flex flex-col gap-4 h-[200px] justify-between relative overflow-hidden">
          <div className="absolute top-0 p-6 left-0 z-[10] h-full flex flex-col justify-between ">
            <div className="max-w-[800px]">
              <div className="mb-2">
                <p className="text-3xl">Powered by Open Source</p>
              </div>
              <div>
                <p>
                  Neo is built on open-source technologies and distributed under the MIT license. It
                  is freely available for both commercial and non-commercial use, empowering
                  developers and organizations alike.
                </p>
              </div>
            </div>
            <Button
              size={'lg'}
              className="w-fit"
              onClick={() => window.api.openExternal(import.meta.env.VITE_NEO_GITHUB_URL as string)}
            >
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Neo Desktop GitHub
            </Button>
          </div>
          <img
            className="w-full object-fill absolute top-1/2 left-0 -translate-y-1/2"
            src={waves}
          />
        </div>
      </div>
    </div>
  )
}
