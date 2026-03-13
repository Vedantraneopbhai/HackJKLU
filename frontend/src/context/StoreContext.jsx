import { createContext, useContext, useReducer, useCallback } from 'react'

const initialState = {
  user: null,
  isAuthenticated: false,
  stats: {
    explanationsToday: 0,
    studyStreak: 1,
    pdfsRead: 0,
    conceptsMastered: 0,
    totalExplanations: 0
  },
  courses: [
    { id: 1, title: 'Physics 101', subject: 'Physics', progress: 0, page: 1, total: 380, lastRead: null, pdfUrl: null },
    { id: 2, title: 'Calculus II', subject: 'Math', progress: 0, page: 1, total: 300, lastRead: null, pdfUrl: null },
    { id: 3, title: 'Organic Chemistry', subject: 'Chemistry', progress: 0, page: 1, total: 240, lastRead: null, pdfUrl: null }
  ],
  recentActivity: [],
  heatmapData: Array(7).fill(null).map(() => Array(3).fill(0)),
  notifications: [
    { id: 1, type: 'welcome', title: 'Welcome to Learnify Apex!', body: 'Upload your first PDF to get started', time: 'now', unread: true },
    { id: 2, type: 'tip', title: 'Pro tip', body: 'Click any line in your PDF to get an instant explanation', time: 'now', unread: true }
  ],
  currentPDF: null,
  explanations: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true }
    case 'LOGOUT':
      return { ...initialState }
    case 'UPDATE_STATS':
      return { ...state, stats: { ...state.stats, ...action.payload } }
    case 'ADD_EXPLANATION':
      return {
        ...state,
        stats: {
          ...state.stats,
          explanationsToday: state.stats.explanationsToday + 1,
          totalExplanations: state.stats.totalExplanations + 1
        },
        recentActivity: [action.payload, ...state.recentActivity].slice(0, 10),
        explanations: [...state.explanations, action.payload]
      }
    case 'UPDATE_COURSE_PROGRESS':
      return {
        ...state,
        courses: state.courses.map(c =>
          c.id === action.payload.id
            ? { ...c, ...action.payload.data, lastRead: new Date().toISOString() }
            : c
        )
      }
    case 'UPDATE_HEATMAP':
      return { ...state, heatmapData: action.payload }
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, unread: false } : n
        )
      }
    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, unread: false }))
      }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [{ ...action.payload, id: Date.now() }, ...state.notifications]
      }
    case 'SET_CURRENT_PDF':
      return { ...state, currentPDF: action.payload }
    case 'UPLOAD_PDF':
      return {
        ...state,
        courses: state.courses.map(c =>
          c.id === action.payload.courseId
            ? { ...c, pdfUrl: action.payload.url, title: action.payload.title }
            : c
        ),
        stats: { ...state.stats, pdfsRead: state.stats.pdfsRead + 1 }
      }
    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = useCallback((user) => {
    dispatch({ type: 'LOGIN', payload: user })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [])

  const updateStats = useCallback((stats) => {
    dispatch({ type: 'UPDATE_STATS', payload: stats })
  }, [])

  const addExplanation = useCallback((explanation) => {
    dispatch({ type: 'ADD_EXPLANATION', payload: explanation })
  }, [])

  const updateCourseProgress = useCallback((id, data) => {
    dispatch({ type: 'UPDATE_COURSE_PROGRESS', payload: { id, data } })
  }, [])

  const updateHeatmap = useCallback((data) => {
    dispatch({ type: 'UPDATE_HEATMAP', payload: data })
  }, [])

  const markNotificationRead = useCallback((id) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id })
  }, [])

  const clearAllNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' })
  }, [])

  const addNotification = useCallback((notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }, [])

  const setCurrentPDF = useCallback((pdf) => {
    dispatch({ type: 'SET_CURRENT_PDF', payload: pdf })
  }, [])

  const uploadPDF = useCallback((courseId, url, title) => {
    dispatch({ type: 'UPLOAD_PDF', payload: { courseId, url, title } })
  }, [])

  const value = {
    state,
    login,
    logout,
    updateStats,
    addExplanation,
    updateCourseProgress,
    updateHeatmap,
    markNotificationRead,
    clearAllNotifications,
    addNotification,
    setCurrentPDF,
    uploadPDF
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
