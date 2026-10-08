import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TaskCenterPage } from './TaskCenterPage'

const renderTaskPage = (pageId: 'newcomer' | 'mainline' | 'professional' = 'newcomer') => {
  const onPageChange = vi.fn()
  render(<TaskCenterPage pageId={pageId} onPageChange={onPageChange} onHome={vi.fn()} />)
  return { onPageChange }
}

const getTaskRow = (title: string) => {
  const row = screen.getByText(title).closest('.task-row')
  if (!(row instanceof HTMLElement)) throw new Error(`未找到任务行：${title}`)
  return row
}

describe('TaskCenterPage', () => {
  it('allows a pending task to be enrolled and updates its status', async () => {
    renderTaskPage()
    const row = await waitFor(() => getTaskRow('上传个人简历'))

    fireEvent.click(within(row).getByRole('button', { name: '报名' }))

    await waitFor(() => {
      expect(within(row).getByText('进行中')).toBeInTheDocument()
      expect(within(row).getByRole('button', { name: '已报名' })).toBeInTheDocument()
    })
    expect(screen.getByRole('status')).toHaveTextContent('已报名“上传个人简历”')
  })

  it('submits task materials and marks an in-progress task as completed', async () => {
    renderTaskPage()
    const row = await waitFor(() => getTaskRow('完善个人简历'))

    fireEvent.click(within(row).getByRole('button', { name: '提交材料' }))
    fireEvent.change(screen.getByLabelText('完成说明'), { target: { value: '已完成个人简历优化' } })
    fireEvent.click(screen.getByRole('button', { name: '确认提交' }))

    await waitFor(() => {
      expect(row.querySelector('.task-row__status')).toHaveTextContent('已完成')
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
    expect(screen.getByRole('status')).toHaveTextContent('材料已提交，任务已完成')
  })

  it('exposes the professional task entry from the task navigation', async () => {
    const { onPageChange } = renderTaskPage()
    await waitFor(() => expect(screen.getByRole('heading', { name: '新手任务', level: 1 })).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: /专业任务/ }))

    expect(onPageChange).toHaveBeenCalledWith('professional')
  })

  it('renders professional tasks without the general ability column', async () => {
    renderTaskPage('professional')

    await waitFor(() => expect(screen.getByRole('heading', { name: '专业任务', level: 1 })).toBeInTheDocument())
    expect(screen.getByText('迎接1位客户')).toBeInTheDocument()
    expect(getTaskRow('迎接1位客户')).toHaveClass('task-row--without-ability')
  })
})
