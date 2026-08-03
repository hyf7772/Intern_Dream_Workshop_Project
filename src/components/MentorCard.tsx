import type { MentorInfo } from '../types/task'

export function MentorCard({ mentor, onAction }: { mentor: MentorInfo; onAction: (message: string) => void }) {
  return (
    <section className="mentor-section" aria-labelledby="mentor-heading">
      <div className="section-heading"><div><h2 id="mentor-heading">导师带教</h2><p>关注方向、反馈与沟通安排</p></div><span>不计星愿值</span></div>
      <div className="mentor-card">
        <div className="mentor-avatar" aria-hidden="true">👩🏻‍💼</div>
        <div className="mentor-copy"><h3>导师：{mentor.name} <span>{mentor.department}</span></h3><p><b>本周指导：</b>{mentor.weeklyGuidance}</p><p><b>最近反馈：</b>{mentor.latestFeedback}</p></div>
        <div className="mentor-time"><small>下次沟通</small><strong>{mentor.nextMeeting}</strong><span>{mentor.status}</span></div>
        <div className="mentor-actions"><button type="button" onClick={() => onAction('已为你打开导师沟通入口')}>联系导师</button><button type="button" onClick={() => onAction('学习记录提交入口已打开')}>提交学习记录</button></div>
      </div>
    </section>
  )
}

