import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
	sidebarOpen: boolean
	toggleSidebar: () => void
	closeSidebar: () => void
	openSidebar: () => void
}

export const useUIStore = create<UIStore>()(
	persist(
		(set) => ({
			sidebarOpen: true,

			toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
			closeSidebar: () => set({ sidebarOpen: false }),
			openSidebar: () => set({ sidebarOpen: true }),
		}),
		{
			name: 'ui-storage',
			partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
		}
	)
)

