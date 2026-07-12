import { useEffect } from 'react'

const STORAGE_KEY = 'nexteca_application_draft'

export function useFormAutoSave(formRef: React.RefObject<HTMLFormElement>) {
  // Save form data to localStorage
  const saveFormData = () => {
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data: Record<string, any> = {}

    // Collect all form values
    formData.forEach((value, key) => {
      if (data[key]) {
        // Handle multiple values for same key (checkboxes, radios)
        if (Array.isArray(data[key])) {
          data[key].push(value)
        } else {
          data[key] = [data[key], value]
        }
      } else {
        data[key] = value
      }
    })

    // Also collect radio button values and checkboxes
    const form = formRef.current
    const radios = form.querySelectorAll('input[type="radio"]')
    const checkboxes = form.querySelectorAll('input[type="checkbox"]')

    radios.forEach((radio: any) => {
      if (radio.checked) {
        data[radio.name] = radio.value
      }
    })

    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        data[checkbox.name] = checkbox.value
      }
    })

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      console.log('[v0] Form data auto-saved to localStorage')
    } catch (error) {
      console.error('[v0] Failed to save form data:', error)
    }
  }

  // Restore form data from localStorage
  const restoreFormData = () => {
    if (!formRef.current) return

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return

      const data = JSON.parse(saved)
      const form = formRef.current

      // Restore input values
      Object.keys(data).forEach((key) => {
        const element = form.elements.namedItem(key)
        if (!element) return

        if (element instanceof RadioNodeList) {
          // Handle radio buttons
          ;(element as any).forEach((radio: any) => {
            radio.checked = radio.value === data[key]
          })
        } else if (element instanceof HTMLInputElement) {
          if (element.type === 'checkbox') {
            element.checked = data[key] === element.value
          } else {
            element.value = data[key]
          }
        } else if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
          element.value = data[key]
        }
      })

      console.log('[v0] Form data restored from localStorage')
    } catch (error) {
      console.error('[v0] Failed to restore form data:', error)
    }
  }

  // Clear saved form data
  const clearFormData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('[v0] Saved form data cleared')
    } catch (error) {
      console.error('[v0] Failed to clear form data:', error)
    }
  }

  // Auto-save on mount and when form changes
  useEffect(() => {
    if (!formRef.current) return

    // Restore on first load
    restoreFormData()

    const form = formRef.current

    // Save on any input change
    const handleChange = () => {
      saveFormData()
    }

    // Listen for changes on all input types
    form.addEventListener('change', handleChange)
    form.addEventListener('input', handleChange)

    return () => {
      form.removeEventListener('change', handleChange)
      form.removeEventListener('input', handleChange)
    }
  }, [])

  return { clearFormData, restoreFormData }
}
