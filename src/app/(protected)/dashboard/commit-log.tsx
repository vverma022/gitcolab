import useProject from '@/hooks/use-projects'
import React from 'react'
import { api } from '@/trpc/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const CommitLog = () => {
    const { selectedprojectId, projects } = useProject();
    const projectId = selectedprojectId
    const {data: commits} = api.project.getCommits.useQuery({projectId})
  return (
    <>
    <ul className='space-y-6'>
        {commits?.map((commit, commitIdx) => {
            return <li key={commit.id} className='realtive flex gap-x-4'>
                <div className={cn(
                    commitIdx === commits.length - 1 ? 'h6' : '-bottom-6',
                    'absolute left-0 top-0 flex w-6 justify-center'
                )}>
                    <div className='w-px translate-x-1 bg-gray-200'></div>
                </div>
                <>
                <img src={commit.commitAuthorAvatar} alt="commit avatar" className='relative mt-4 size-8 flex-none rounded-full bg-gray-50' />
                <div className='flex-auto rounded-mg bg-white p-3 ring-1 ring-inset ring-gray-200'>
                    <div className='flex justify-between gap-x-4'>
                        <Link target='_blank' href={`${projects?.githubUrl}/commits/${commit.commitHash}`} className="py-0.5 text-xs leading-5 text-gray-500" >
                        <span className='font-medium text-gray-900'>
                        {commit.commitAuthorName}
                        </span>{" "}
                        <span className='inline-flex items-center'>
                            commited 
                            <ExternalLink className='ml-1 size-4'/>
                        </span>
                        </Link>
                    </div>
                    <span className='font-semibold'>
                        {commit.commitMessage}
                    </span>
                    <pre className='mt-2 whitespace-pre-wrap text-sm leading-0 text-gray-500'>
                        {commit.summary}
                    </pre>
                </div>
                </>
                </li>
        })}

    </ul>
    </>
  )
}

export default CommitLog