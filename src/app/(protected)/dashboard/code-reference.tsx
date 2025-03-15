"use client"
import React from "react"
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props =
 {
    filesReferences: {fileName: string; sourceCode: string; summary: string }[]
}

const CodeReferences = ({filesReferences} : Props) => {
    const [tab, setTab] = React.useState(filesReferences[0]?.fileName)
    if(filesReferences.length === 0) return null

  return (
    <div className="max-w-[70vw]">
    <Tabs value={tab} onValueChange={setTab}>
        <div className="overflow-scroll flex-gap-2 bg-gray-200 p-1 rounded-md">
            {filesReferences.map(file => (
                <Button onClick={() => setTab(file.fileName)} key={file.fileName} className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-muted-foreground hover:bg-muted',
                    {
                         'bg-primary text-primary-foreground': tab === file.fileName,
                    }
                )}>
                    {file.fileName}
                </Button>
            ))}
        </div>
        {filesReferences.map(file => {
            <TabsContent key={file.fileName} value={file.fileName} className="max-h-[40vh] overflow-scroll max-w-70xl rounded-md">
               <SyntaxHighlighter language="typescript" style={materialDark}>
                 {file.sourceCode}
               </SyntaxHighlighter>
            </TabsContent>
        })}
    </Tabs>
    </div>

     
  )
}

export default CodeReferences